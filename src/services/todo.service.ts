import { todos } from "./firebase";

export interface Todo {
    id?: any;
    title?: string;
    completed?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export class TodoService {

    static fetchAll() {
        return todos.orderBy("created_at", "desc").onSnapshot((snapshot) => {
            return snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
        });
    }

    static create(data: Todo) {
        const created_at = new Date();
        return todos
        .add({...data, created_at});
    }

    static update(data: Todo) {
        const updated_at = new Date();
        return todos
        .doc(data.id)
        .set({...data, updated_at})
    }

    static delete(data: Todo) {
        return todos
        .doc(data.id)
        .delete();
    }
    
}