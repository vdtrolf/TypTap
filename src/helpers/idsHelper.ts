import Island from "../data/model/island";

export const getUniqueId = async (dbHelper: any, prefix:number) : Promise<number> => {
    
    let counter = 0;
    let foundId = 0;
    
    while (counter < 20 ) {
        let testId = Math.floor(prefix * 1000 + Math.random() * 999);
        const island : Island = (await dbHelper.getItem("islands",testId)) as unknown as Island;
        console.dir(island)
        if ( ! island.id ) {
            foundId = testId;
            break;
        }
        counter += 1;
    }

    return foundId;

} 

export const getUniqueKey = (prefix:number)  => {
    return Math.floor(prefix * 1000000000 + Math.random() * 999999999);
} 