module.exports = {
    createGame (results) {
        return `
        BEGIN;

        INSERT INTO games DEFAULT VALUES returning gameid;

        INSERT INTO gameplayers
        (gameid, playerid, ratingchange, playerrole, isalive)
        VALUES
        ${
            results.map(player => {
                return `(lastval(), ${player.user.id}, ${player.ratingChange}, '${player.role}', ${player.isAlive})`
            })
        };

        UPDATE users set
            rating = users.rating + new.ratingChange
        from (values
            ${results.map(player => {
                return `(${player.user.id}, ${player.ratingChange})`
            })}
        ) as new(playerid, ratingchange) 
            where new.playerid = users.id;

        COMMIT;
        `
    }
}