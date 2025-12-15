import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto, TaskQueryDto } from './task.dto';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async findAll(@Request() req, @Query() query: TaskQueryDto) {
    return this.taskService.findAll(req.user.id, query);
  }

  @Get('stats')
  async getStats(@Request() req) {
    return this.taskService.getStats(req.user.id);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.findOne(id, req.user.id);
  }

  @Post()
  async create(@Request() req, @Body() dto: CreateTaskDto) {
    return this.taskService.create(req.user.id, dto);
  }

  @Patch(':id')
  async update(
    @Request() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, req.user.id, dto);
  }

  @Patch(':id/toggle')
  async toggleComplete(@Request() req, @Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.toggleComplete(id, req.user.id);
  }

  @Delete(':id')
  async remove(@Request() req, @Param('id', ParseUUIDPipe) id: string) {
    return this.taskService.remove(id, req.user.id);
  }
}
