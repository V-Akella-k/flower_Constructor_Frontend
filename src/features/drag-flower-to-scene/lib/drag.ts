import { DND_MIME, type DragFlowerPayload } from "../model/types";

export function setFlowerDragData(e: React.DragEvent, payload: DragFlowerPayload) {
  e.dataTransfer.setData(DND_MIME, JSON.stringify(payload));
  e.dataTransfer.effectAllowed = "copy";
}
