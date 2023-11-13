// External Dependencies
import * as dotenv from 'dotenv' 
dotenv.config()

import express, { Request, Response } from "express";
import User from "../models/users";
import {getNamesList} from "./getNamesList"
import {getName} from "./getName"
import {createName} from "./createName"
import Name from "../models/name";
import {getScoresList} from "./getScoresList"
import {getScore} from "./getScore"
import {createScore} from "./createScore"
import Score from "../models/score";
import {getUsersList} from "./getUsersList"
import {getUser} from "./getUser"
import {createUser} from "./createUser"
import Island from "../models/island";
import {getIslandsList} from "./getIslandsList"
import {getIsland} from "./getIsland"
import {createIsland} from "./createIsland"

import { getUniqueId,getUniqueKey } from '../services/idsHelper';

// Constants

import { PREFIX_ISLAND } from '../constants';

// Set de db helper, which can be i.e. acebase or DynamoDB

let dbHelper : any = null;

export const setDbHelper = (module) => {
    dbHelper = module;
}

// Global Config

export const flashRouter = express.Router();
flashRouter.use(express.json());

const path = process.env.API_PATH ;

// GET NAME

flashRouter.get(path + "/create", async (_req: Request, res: Response) => {
    
    try {
        const uniqueId = await getUniqueId(dbHelper,PREFIX_ISLAND)
        const uniqueKey = getUniqueKey(PREFIX_ISLAND)

        const island = new Island(uniqueId,uniqueKey);
        dbHelper.putItem("islands",island, island.id);

        res.status(200).send(island);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// GET NAME

flashRouter.get(path + "/names/", async (_req: Request, res: Response) => {
    try {
       const names = (await getNamesList(dbHelper));

        res.status(200).send(names);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/names/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const name : Name = (await getName(dbHelper,id));

        if (name) {
            res.status(200).send(name);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching name with id: ${req.params.id}`);
    }
});

// POST NAME

flashRouter.post(path + "/names/", async (req: Request, res: Response) => {
    
    try {
        const name = req.body as Name;
        const result = createName(dbHelper,name);

        result
            ? res.status(201).send(`Successfully created a new name with id ${name.id}`)
            : res.status(500).send("Failed to create a new name.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// GET SCORE

flashRouter.get(path + "/scores/", async (_req: Request, res: Response) => {
    try {
       const scores = (await getScoresList(dbHelper));

        res.status(200).send(scores);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/scores/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const score : Score = (await getScore(dbHelper,id));

        if (score) {
            res.status(200).send(score);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching score with id: ${req.params.id}`);
    }
});

// POST SCORE

flashRouter.post(path + "/scores/", async (req: Request, res: Response) => {
    
    try {
        const score = req.body as Score;
        const result = createScore(dbHelper,score);

        result
            ? res.status(201).send(`Successfully created a new score with id ${score.id}`)
            : res.status(500).send("Failed to create a new score.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// GET USER

flashRouter.get(path + "/users/", async (_req: Request, res: Response) => {
    try {
       const users = (await getUsersList(dbHelper));

        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/users/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const user : User = (await getUser(dbHelper,id));

        if (user) {
            res.status(200).send(user);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching user with id: ${req.params.id}`);
    }
});

// POST USER

flashRouter.post(path + "/users/", async (req: Request, res: Response) => {
    
    try {
        const user = req.body as User;
        const result = createUser(dbHelper,user);

        result
            ? res.status(201).send(`Successfully created a new user with id ${user.id}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

// GET ISLAND

flashRouter.get(path + "/islands/", async (_req: Request, res: Response) => {
    try {
       const islands = (await getIslandsList(dbHelper));

        res.status(200).send(islands);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

flashRouter.get(path + "/islands/:id", async (req: Request, res: Response) => {
    const id:string = req?.params?.id;
    try {
        const island : Island = (await getIsland(dbHelper,id));

        if (island) {
            res.status(200).send(island);
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching island with id: ${req.params.id}`);
    }
});

// POST ISLAND

flashRouter.post(path + "/islands/", async (req: Request, res: Response) => {
    
    try {
        const island = req.body as Island;
        const result = createIsland(dbHelper,island);

        result
            ? res.status(201).send(`Successfully created a new island with id ${island.id}`)
            : res.status(500).send("Failed to create a new island.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
