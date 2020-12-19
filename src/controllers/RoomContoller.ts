import { getConnection } from "typeorm";

import { Room } from "../entity";

export const createRoomContoller = async (req, res) => {
  const { room_number, price, max_persons, room_type } = req.body;

  const roomRepo = getConnection().getRepository(Room);
  const previouRoomEntry = await roomRepo.findOne({ room_number });

  if (previouRoomEntry) {
    return res.json({ error: "Room already created with this name" });
  }

  const newRoom = new Room();
  newRoom.room_number = room_number;
  newRoom.price = price;
  newRoom.max_persons = max_persons;
  newRoom.room_type = room_type;

  const newCreatedRoom = await roomRepo.save(newRoom);

  res.json({ room: newCreatedRoom });
};
