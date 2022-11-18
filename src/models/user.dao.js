const { AppDataSource } = require("./data-source");

const createUser = async (email, hashedPassword, nickname) => {
    await AppDataSource.query(
        `
        INSERT INTO users(
            email,
            password,
            nick_name
            ) VALUES (?, ?, ?);
        `,
        [email, hashedPassword, nickname]
    );
};

    const getUserByEmail = async (email) => {
    const [user] = await AppDataSource.query(
        `
        SELECT *
        FROM users u
        WHERE u.email = ?
        `,
        [email]
    );

    return user;
};



module.exports = { createUser, getUserByEmail };