db.createUser(
    {
        user: "root",
        pwd: "PasswordProjetExemple***",
        roles: [
            {
                role: "readWrite",
                db: "test"
            }
        ]
    }
);