import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTaskStore } from "@/store/useTodoStore";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
} from "@mui/material";

export default function TaskDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const { tasks, updateTask, deleteTask, toggleTaskCompletion } = useTaskStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const task = tasks.find((t) => t.id === id);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDeadline(task.deadline || "");
    }
  }, [task]);

  const handleUpdate = () => {
    if (!task) return;

    updateTask({
      ...task,
      title,
      description,
      deadline,
    });

    router.push("/todo");
  };

  const handleDelete = () => {
    if (!task) return;

    deleteTask(task.id);
    router.push("/todo");
  };

  const handleToggleCompletion = () => {
    if (!task) return;

    toggleTaskCompletion(task.id);
  };

  if (!task) {
    return (
      <Container maxWidth="sm">
        <Typography mt={4} variant="h6" color="error">
          Görev bulunamadı.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Görev Detayı
          </Typography>

          <TextField
            label="Başlık"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Açıklama"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Son Tarih"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />

          <Typography variant="body2" sx={{ mb: 2 }}>
            Durum:{" "}
            <strong>
              {task.completed ? "Tamamlandı ✅" : "Tamamlanmadı ❌"}
            </strong>
          </Typography>

          <Box display="flex" gap={2} flexWrap="wrap">
            <Button
              variant="contained"
              color="success"
              onClick={handleToggleCompletion}
            >
              {task.completed ? "Geri Al" : "Tamamla"}
            </Button>

            <Button variant="contained" onClick={handleUpdate}>
              Güncelle
            </Button>

            <Button variant="outlined" color="error" onClick={handleDelete}>
              Sil
            </Button>

            <Button onClick={() => router.push("/todo")}>Geri Dön</Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
