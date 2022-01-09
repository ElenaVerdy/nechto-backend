
const addRatingChange = (results) => {
    const GAME_ROLES = {
        NECHTO: 'Нечто',
        INFECTED: 'Зараженный',
        CIVILIAN: 'Мирный'
    }

    const isNechtoAlive =  results.find(player => player.role === GAME_ROLES.NECHTO).isAlive

    const areAllAliveAndInfected = !results.find(player => player.role === GAME_ROLES.CIVILIAN || !player.isAlive)

    if (areAllAliveAndInfected) {
        results.forEach(element => {
            element.ratingChange = element.role === GAME_ROLES.NECHTO ? 25 : -3
        });

        return
    }

    if (!isNechtoAlive) {
        results.forEach(element => {
            switch (element.role) {
                case GAME_ROLES.NECHTO:
                    element.ratingChange = -15
                    break;
                case GAME_ROLES.INFECTED:
                    element.ratingChange = element.isAlive ? -5 : -10
                    break;
                case GAME_ROLES.CIVILIAN:
                    element.ratingChange = element.isAlive ? 15 : 7
                    break;
            }
        });

        return
    }

    results.forEach(element => {
        switch (element.role) {
            case GAME_ROLES.NECHTO:
                element.ratingChange = 15
                break;
            case GAME_ROLES.INFECTED:
                element.ratingChange = element.isAlive ? 8 : 3
                break;
            case GAME_ROLES.CIVILIAN:
                element.ratingChange = element.isAlive ? -8 : -3
                break;
        }
    });
}

module.exports = addRatingChange
