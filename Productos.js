const fs = require('fs');

class Contenedor {
    constructor(nameFile) {
        this.nameFile = nameFile;
        this.productosArr = [];
    }

    async findId(id) {
        return this.productosArr.find(obj => obj.id === parseInt(id))
    };

    async findIndex(id) {
        return this.productosArr.findIndex(obj => obj.id === parseInt(id))
    }

    async filterId(id) {
        return this.productsArr.filter(obj => obj.id !== id)
    }

    async save(product) {
        const findAll = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
        this.productosArr = JSON.parse(findAll);
        let id = this.productosArr.length > 0 ? this.productosArr[this.productosArr.length-1].id + 1 : 1;
        if (this.productosArr.length > 0) {
            let objectWithId = {
                id: id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }
            this.productosArr.push(objectWithId);
        } else {
            this.productosArr = [{
                id: id,
                title: product.title,
                price: product.price,
                thumbnail: product.thumbnail
            }]
        }
        try {
            let saveData = await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(this.productosArr, null, 2), 'utf-8');
            return this.productosArr
        } catch (e) {
            return `No se pudo guardar el producto`;
        }
    }

    async getById(id) {
        try {
            let findId = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
            this.productosArr = JSON.parse(findId);
            let result = await this.findId(id);
            return result === undefined ? null : result;
        } catch {
            return "Error al leer archivo";
        }
    }

    async getAll() {
        try {
            let findId = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
            this.productosArr = JSON.parse(findId);
            return this.productosArr;
        } catch {
            return "Error al leer arreglo";
        }
    }

    async updateById(id, product) {
        try {
            let findId = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
            this.productosArr = JSON.parse(findId);
            let result = await this.findIndex(id);
            if (result > -1) {
                this.productosArr[result].title = product.title;
                this.productosArr[result].price = product.price;
                this.productosArr[result].thumbnail = product.thumbnail;
                try {
                    let saveData = await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(this.productosArr, null, 2), 'utf-8');
                    return `Producto editado con id: ${id}`
                } catch (e) {
                    return `No se pudo guardar el producto`;
                }
            } else{
                return "No existe el producto"
            }
        } catch {
            return "Error al ejecutar acción";
        }
    }

    async deleteById(id) {
        try {
            let findId = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
            this.productosArr = JSON.parse(findId);
            let result = await this.findIndex(id);
            if (result > -1) {
                this.productosArr.splice(result, 1);
                try {
                    let saveData = await fs.promises.writeFile(`./${this.nameFile}`, JSON.stringify(this.productosArr, null, 2), 'utf-8');
                    return `Producto eliminado con id: ${id}`
                } catch (e) {
                    return `No se pudo eliminar el producto`;
                }
            } else {
                return `El producto con ID ${id} no existe`
            }
        } catch {
            return "Error al eliminar producto"
        }
    }
}



module.exports = Contenedor;