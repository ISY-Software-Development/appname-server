import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema/schema';
import { PrismaClient } from '@prisma/client';
import bodyParser from 'body-parser';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const prisma = new PrismaClient();

// GraphQL Endpoint
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

// Test CRUD Endpoints
app.post('/', jsonParser, async (req: Request, res: Response) => {
    console.log(req);
    const { username, password } = req.body;
    const user = await prisma.user.create({
        data: {
            username: username,
            password: password
        }
    });

    res.json(user);
});

app.get("/", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.put("/", jsonParser, async (req: Request, res: Response) => {
    const { id, username } = req.body;
    const updatedUser = await prisma.user.update({
        where: {
            id: id
        },
        data: {
            username: username
        }
    });

    res.json(updatedUser);
});

app.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const deletedUser = await prisma.user.delete({
        where: {
            id: Number(id)
        }
    });

    res.json(deletedUser);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
