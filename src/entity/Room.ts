import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, BeforeInsert} from "typeorm";

@Entity('rooms')
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room_number: string;

    @Column()
    price: string;

    @Column()
    locked: boolean;

    @Column()
    max_persons: number;

    @Column()
    room_type: string;

    @BeforeInsert()
    beforeInsertActions() {
        this.locked = false;
    }

}