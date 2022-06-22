import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './shared/task.service';
import { TaskSchema } from './schemas/task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Task } from './shared/task';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Task', schema: TaskSchema }])],
  controllers: [TasksController],
  providers: [TaskService, Task],
})
export class TasksModule {}
