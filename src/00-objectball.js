
function gameObject() {
    const object = {
        "home": {
            "teamName": "Brooklyn Nets",
            "colors": ["Black", "White"],
            "players": {
                "Alan Anderson": {
                    "number": 0,
                    "shoe": 16,
                    "points": 22,
                    "rebounds": 12,
                    "assists": 12,
                    "steals": 3,
                    "blocks": 1,
                    "slamDunks": 1
                },
                "Reggie Evans": {
                    "number": 30,
                    "shoe": 14,
                    "points": 12,
                    "rebounds": 12,
                    "assists": 12,
                    "steals": 12,
                    "blocks": 12,
                    "slamDunks": 7
                },
                "Brook Lopez": {
                    "number": 11,
                    "shoe": 17,
                    "points": 17,
                    "rebounds": 19,
                    "assists": 10,
                    "steals": 3,
                    "blocks": 1,
                    "slamDunks": 15
                },
                "Mason Plumlee": {
                    "number": 1,
                    "shoe": 19,
                    "points": 26,
                    "rebounds": 12,
                    "assists": 6,
                    "steals": 3,
                    "blocks": 8,
                    "slamDunks": 5
                },
                "Jason Terry": {
                    "number": 31,
                    "shoe": 15,
                    "points": 19,
                    "rebounds": 2,
                    "assists": 2,
                    "steals": 4,
                    "blocks": 11,
                    "slamDunks": 1
                }
            }
        },
        "away": {
            "teamName": "Charlotte Hornets",
            "colors": ["Turquoise", "Purple"],
            "players": {
                "Jeff Adrien": {
                    "number": 4,
                    "shoe": 18,
                    "points": 10,
                    "rebounds": 1,
                    "assists": 1,
                    "steals": 2,
                    "blocks": 7,
                    "slamDunks": 2
                },
                "Bismak Biyombo": {
                    "number": 0,
                    "shoe": 16,
                    "points": 12,
                    "rebounds": 4,
                    "assists": 7,
                    "steals": 7,
                    "blocks": 15,
                    "slamDunks": 10
                },
                "DeSagna Diop": {
                    "number": 2,
                    "shoe": 14,
                    "points": 24,
                    "rebounds": 12,
                    "assists": 12,
                    "steals": 4,
                    "blocks": 5,
                    "slamDunks": 5
                },
                "Ben Gordon": {
                    "number": 8,
                    "shoe": 15,
                    "points": 33,
                    "rebounds": 3,
                    "assists": 2,
                    "steals": 1,
                    "blocks": 1,
                    "slamDunks": 0
                },
                "Brendan Haywood": {
                    "number": 33,
                    "shoe": 15,
                    "points": 6,
                    "rebounds": 12,
                    "assists": 12,
                    "steals": 22,
                    "blocks": 5,
                    "slamDunks": 12
                }
            }
        }
    };
    return object;
}

function playerStats(playerName) {
    let stats = gameObject()
    let teams = Object.keys(stats)
    // get player names
    let playernames = teams.map( team => Object.keys(stats[team]["players"]))
    playernames = playernames.flat()
    // find player name in list
    let player;
    for (let name in playernames) {
        if (playernames[name] === playerName) {
            teams.forEach( team => {
                if (stats[team]["players"][playernames[name]] != null) {
                    player = stats[team]["players"][playernames[name]]
                }
            })
        }
    }
    return player
}

function allPlayersArray() {
    let stats = gameObject()
    let teams = Object.keys(stats)
    let playerArray = [];
    teams.forEach( team => {
        let players = Object.keys(stats[team]["players"])
        players.forEach( player => {
            let obj = {};
            obj[player] = stats[team]["players"][player]
            playerArray.push(obj)
        })
    })
    return playerArray;
}

function findPlayerStat(statName, playerName) {
    let player = playerStats(playerName);
    return player[statName]
}

function findTeam(teamName) {
    let stats = gameObject()
    let teams = Object.keys(stats)
    let desiredTeam;
    for (let x in teams) {
        if (stats[teams[x]]["teamName"] === teamName) {
            desiredTeam = stats[teams[x]]
        }
    }
    return desiredTeam
}

function teamColors(teamName) {
    let team = findTeam(teamName)
    return team.colors
}

function numPointsScored(playerName) {
    return findPlayerStat("points", playerName) 
}

function shoeSize(playerName) {
    return findPlayerStat("shoe", playerName)
}


function teamNames() {
    let stats = gameObject()
    let homeaway = Object.keys(stats)
    let teamNames = homeaway.map(team => stats[team]["teamName"])
    return teamNames
}

function playerNumbers(teamName) {
    let team = findTeam(teamName)
    let players = Object.values(team["players"])
    let jerseyNumbers = players.map(object => object.number)
    return jerseyNumbers
}

function playerSuperlative(superlative) {
    let players = allPlayersArray();
    let biggest = 0;
    let bestPlayer;
    for (let x in players) {
        let playerStat = Object.values(players[x])[0][superlative]
        if (biggest < playerStat) {
            biggest = playerStat
            bestPlayer = players[x]
        }
    }
    return bestPlayer;
}

function bigShoeRebounds() {
    let bigShoePlayer = playerSuperlative("shoe")
    return Object.values(bigShoePlayer)[0].rebounds
}

function mostPointsScored() {
    let mostPointsPlayer = playerSuperlative("points")
    return Object.keys(mostPointsPlayer)
}

function winningTeam() {
    let stats = gameObject()
    let teams = Object.keys(stats)
    let finalScores = [];
    for (let x in teams) {
        let score = 0;
        let players = Object.values(stats[teams[x]]["players"])
        score = players.reduce((acc, cur) => acc + cur.points, 0)
        finalScores.push(score)
    }
    if (finalScores[0] > finalScores[1]) {
        let message = `${stats[teams[0]]["teamName"]} won with ${finalScores[0]} points!`
        return message
    } else {
        let message = `${stats[teams[1]]["teamName"]} won with ${finalScores[1]} points!`
        return message
    }
}

function playerWithLongestName() {
    let players = allPlayersArray()
    let long = 0;
    let longPlayer;
    for (let x in players) {
        let a = Object.keys(players[x])
        let player = a[0]
        if (player.length > long) {
            long = player.length
            longPlayer = player
        }
    }
    return longPlayer
}

function doesLongNameStealATon() {
    let longBoi = playerWithLongestName()
    let stealer = playerSuperlative("steals")
    let a = Object.keys(stealer)
    stealer = a[0]
    if (longBoi === stealer) {
        return true;
    } else {
        return false;
    }
}