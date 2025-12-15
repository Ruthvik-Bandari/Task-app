import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service';
import { CreateTaskDto, UpdateTaskDto, TaskQueryDto } from './task.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: string, query: TaskQueryDto) {
    const { page = 1, limit = 20, sortBy = 'createdAt', sortOrder = 'desc', priority, status, completed, search } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.TaskWhereInput = { userId };

    if (priority) where.priority = priority;
    if (status) where.status = status;
    if (completed !== undefined) where.completed = completed;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [tasks, total] = await Promise.all([
      this.prisma.task.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: sortOrder },
      }),
      this.prisma.task.count({ where }),
    ]);

    return {
      data: tasks,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string) {
    const task = await this.prisma.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async create(userId: string, dto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        ...dto,
        dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
        userId,
      },
    });
  }

  async update(id: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.findOne(id, userId);

    const updateData: Prisma.TaskUpdateInput = { ...dto };
    if (dto.dueDate) {
      updateData.dueDate = new Date(dto.dueDate);
    }

    // Auto-update status when marking as completed
    if (dto.completed === true && !dto.status) {
      updateData.status = 'COMPLETED';
    }

    return this.prisma.task.update({
      where: { id: task.id },
      data: updateData,
    });
  }

  async remove(id: string, userId: string) {
    const task = await this.findOne(id, userId);
    await this.prisma.task.delete({ where: { id: task.id } });
    return { success: true };
  }

  async toggleComplete(id: string, userId: string) {
    const task = await this.findOne(id, userId);
    return this.prisma.task.update({
      where: { id: task.id },
      data: {
        completed: !task.completed,
        status: !task.completed ? 'COMPLETED' : 'TODO',
      },
    });
  }

  async getStats(userId: string) {
    const [total, completed, overdue, byPriority, byStatus] = await Promise.all([
      this.prisma.task.count({ where: { userId } }),
      this.prisma.task.count({ where: { userId, completed: true } }),
      this.prisma.task.count({
        where: {
          userId,
          completed: false,
          dueDate: { lt: new Date() },
        },
      }),
      this.prisma.task.groupBy({
        by: ['priority'],
        where: { userId },
        _count: true,
      }),
      this.prisma.task.groupBy({
        by: ['status'],
        where: { userId },
        _count: true,
      }),
    ]);

    return {
      total,
      completed,
      pending: total - completed,
      overdue,
      byPriority: byPriority.reduce((acc, item) => {
        acc[item.priority] = item._count;
        return acc;
      }, {} as Record<string, number>),
      byStatus: byStatus.reduce((acc, item) => {
        acc[item.status] = item._count;
        return acc;
      }, {} as Record<string, number>),
    };
  }
}
