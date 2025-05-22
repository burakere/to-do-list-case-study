import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
import { Task } from "../../types/Task";
import { useTaskStore } from "@/store/useTodoStore";
import { useThemeStore } from "@/store/themeStore";
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

export default function TodoPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [newTask, setNewTask] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState("all");

  const { toggleMode } = useThemeStore();
  const { tasks, addTask, setTasks } = useTaskStore();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    if (!storedUsername || !storedPassword) {
      router.push("/");
    } else {
      setUsername(storedUsername);
    }
  }, [router]);

  useEffect(() => {
    if (username) {
      const storedTasks = localStorage.getItem(`tasks_${username}`);
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    }
  }, [username, setTasks]);

  useEffect(() => {
    if (username) {
      localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
    }
  }, [tasks, username]);

  const handleAddTask = () => {
    if (newTask.trim() && description.trim()) {
      const task: Task = {
        id: uuidv4(),
        title: newTask.trim(),
        description: description.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        deadline: deadline || undefined,
      };
      addTask(task);
      setNewTask("");
      setDescription("");
      setDeadline("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    router.push("/");
  };

  const getFilteredTasks = () => {
    const now = new Date();
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      case "upcoming":
        return tasks.filter((task) => {
          if (!task.deadline) return false;
          const deadlineDate = new Date(task.deadline);
          const diffInDays =
            (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
          return diffInDays >= 0 && diffInDays <= 3;
        });
      default:
        return tasks;
    }
  };

  const filteredTasks = getFilteredTasks();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reordered = Array.from(filteredTasks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setTasks(reordered);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Merhaba, {username} 👋</Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Button color="inherit" onClick={toggleMode}>
              <Brightness4Icon />
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Çıkış Yap
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Görev Başlığı"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            fullWidth
          />
          <TextField
            label="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
          />
          <TextField
            label="Son Tarih"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleAddTask}>
            Görev Ekle
          </Button>

          <Box mt={2}>
            <Typography variant="subtitle1">Görevleri Filtrele:</Typography>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              fullWidth
            >
              <MenuItem value="all">Tümü</MenuItem>
              <MenuItem value="completed">Tamamlananlar</MenuItem>
              <MenuItem value="incomplete">Tamamlanmayanlar</MenuItem>
              <MenuItem value="upcoming">Yaklaşanlar (3 gün)</MenuItem>
            </Select>
          </Box>
        </Box>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <Box
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{
                  mt: 4,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {filteredTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          width: { xs: "100%", sm: "48%", md: "30%" },
                          minWidth: "250px",
                        }}
                      >
                        <Card variant="outlined" sx={{ height: "100%" }}>
                          <CardContent>
                            <Typography variant="h6">{task.title}</Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                              {task.description}
                            </Typography>
                            {task.deadline && (
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                📅 Son Tarih: {task.deadline}
                              </Typography>
                            )}
                          </CardContent>
                          <CardActions>
                            <Link href={`/todo/${task.id}`} passHref>
                              <Button size="small">Detaya Git</Button>
                            </Link>
                          </CardActions>
                        </Card>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </>
  );
}
