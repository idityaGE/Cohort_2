import zod from 'zod';

// todo schema

const createTodo = zod.object({
    title: zod.string(50),
    description: zod.string(50),
});

const updateTodo = zod.object({
    id: zod.string(),
});

export { createTodo, updateTodo };