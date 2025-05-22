declare module "react-beautiful-dnd" {
  export type DropResult = {
    draggableId: string;
    type: string;
    source: {
      index: number;
      droppableId: string;
    };
    destination: {
      index: number;
      droppableId: string;
    } | null;
    reason: "DROP" | "CANCEL";
    mode: "FLUID" | "SNAP";
    combine?: unknown;
  };

  export type DraggableProvided = {
    innerRef: (element?: HTMLElement | null) => void;
    draggableProps: React.HTMLAttributes<HTMLElement>;
    dragHandleProps: React.HTMLAttributes<HTMLElement>;
  };

  export type DroppableProvided = {
    innerRef: (element?: HTMLElement | null) => void;
    droppableProps: React.HTMLAttributes<HTMLElement>;
    placeholder: React.ReactNode;
  };

  export const DragDropContext: React.FC<{
    onDragEnd: (result: DropResult) => void;
    children: React.ReactNode;
  }>;

  export const Droppable: React.FC<{
    droppableId: string;
    children: (
      provided: DroppableProvided
    ) => JSX.Element | null;

  }>;

  export const Draggable: React.FC<{
    draggableId: string;
    index: number;
    children: (
      provided: DraggableProvided
    ) => JSX.Element | null;

  }>;
}
