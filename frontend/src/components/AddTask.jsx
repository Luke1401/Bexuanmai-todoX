import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import api from '@/lib/axios';
import { toast } from 'sonner';

const AddTask = ({ handleNewTaskAdded }) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const addTask = async () => {
    if (newTaskTitle.trim()) {
      try {
        await api.post('/tasks', { title: newTaskTitle });
        toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm vào`);
        handleNewTaskAdded();
      } catch (error) {
        console.error('Error adding task:', error);
        toast.error('Thêm nhiệm vụ thất bại.');
      }

      setNewTaskTitle('');
    } else {
      toast.error('Bạn cần nhập nội dung của nhiệm vụ.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input 
          type="text" 
          placeholder="Cần phải làm gì?" 
          className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
        />

        <Button
          variant="gradient"
          size="xl"
          className="px-6"
          onClick={addTask}
          disabled={!newTaskTitle.trim()}
        >
          <Plus className="size-5" />
          Thêm
        </Button>
      </div>
    </Card>  
  );
};

export default AddTask