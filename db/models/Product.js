module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INT(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: dataTypes.STRING,
            allowNull: false
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: true
        },
        photo: {
            type: dataTypes.STRING,
            allowNull: false
        },
        price: {
            type: dataTypes.FLOAT(10, 2).UNSIGNED,
            allowNull: false
        },
        stock: {
            type: dataTypes.INT(10).UNSIGNED,
            allowNull: false
        },
        brand_id: {
            type: dataTypes.INT(10).UNSIGNED,
            allowNull: false
        },
        category_id: {
            type: dataTypes.INT(10).UNSIGNED,
            allowNull: false
        }
    };
    let config = {
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        deletedAt: "deleted_at",
        paranoid: true
    };

    const Product = sequelize.define(alias, cols, config);

    Product.associate = function(models){
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        }),
        Product.belongsTo(models.Brand, {
            as: "brand",
            foreignKey: "brand_id"
        })
    }
    
    return Product
}