'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Usuarios', [{
            nombre: 'carlos',
            email: 'prueba@gmail.com',
            password: '$2y$12$dv9ALMUifxDhgoZnHf3HneEzv35gDtaDZQYH5GfTKuNo1BlX7ox1K',
            rol: 'Administrador',
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },

    down: async(queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Usuarios', null, {});

    }
};