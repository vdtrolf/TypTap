import Island from "../model/island";


export const getIsland = async (dbHelper, id: string): Promise<Island> => {

    const island: Island = (await dbHelper.getItem("islands", id)) as unknown as Island;
    return island;
}