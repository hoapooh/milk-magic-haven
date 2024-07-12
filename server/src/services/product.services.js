const { poolPromise, sql } = require("../../database.services");

async function getAllProduct() {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.query(
				"SELECT p.product_id, p.product_name, p.age_range, p.brand_id, p.country_id, p.description, p.image_url, p.price, p.stock, p.status, FLOOR(AVG(r.rating + 0.5)) AS average_rating FROM Products p LEFT JOIN Reviews r ON p.product_id = r.product_id WHERE p.status = 1 GROUP BY p.product_id, p.product_name, p.age_range, p.brand_id, p.country_id, p.description, p.image_url, p.price, p.stock, p.status;"
			);
		return { products: result.recordsets[0] };
	} catch (error) {
		console.log(error);
	}
}

async function getProductById(id) {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("id", id)
			.query(
				"SELECT product_id, product_name, description, price, stock, Brands.brand_name, Originated_Country.country_name, age_range, image_url, status FROM Products join Brands on Products.brand_id = Brands.brand_id join Originated_Country on Products.country_id = Originated_Country.country_id WHERE product_id = @id AND status = 1"
			);

		const product = result.recordset[0];
		if (result.recordset.length === 0)
			return { message: "Product not found", status: 404 };

		return { product };
	} catch (error) {
		console.log(error);
	}
}

async function addProduct({
	product_name,
	product_price,
	product_description,
	image_url,
	stock,
	brand_id,
	country_id,
	age_range,
}) {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("product_name", sql.VarChar, product_name)
			.input("product_price", sql.Decimal, product_price)
			.input("product_description", sql.VarChar, product_description)
			.input("product_image", sql.VarChar, image_url)
			.input("stock", sql.Int, stock)
			.input("brand_id", sql.Int, brand_id)
			.input("country_id", sql.VarChar, country_id)
			.input("age_range", sql.VarChar, age_range)
			.query(
				`INSERT INTO Products (product_name, description, price, stock, brand_id, country_id, age_range, image_url) 
        VALUES (@product_name, @product_description,  @product_price, @stock, @brand_id, @country_id, @age_range, @product_image)`
			);

		if (result.rowsAffected[0] !== 1) {
			return { message: "Failed to add product", status: 400 };
		}

		return { message: "Product added successfully", status: 200 };
	} catch (error) {
		console.log(error);
	}
}

async function updateProduct({
	id,
	product_name,
	product_price,
	product_description,
	image_url,
	stock,
	brand_id,
	country_id,
	age_range,
}) {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("product_id", sql.Int, id)
			.input("product_name", sql.VarChar, product_name)
			.input("product_price", sql.Decimal, product_price)
			.input("product_description", sql.VarChar, product_description)
			.input("product_image", sql.VarChar, image_url)
			.input("stock", sql.Int, stock)
			.input("brand_id", sql.Int, brand_id)
			.input("country_id", sql.VarChar, country_id)
			.input("age_range", sql.VarChar, age_range)
			.query(
				`UPDATE Products SET product_name = @product_name, description = @product_description, price = @product_price, stock = @stock, brand_id = @brand_id, country_id = @country_id, age_range = @age_range, image_url = @product_image WHERE product_id = @product_id`
			);

		if (result.rowsAffected[0] !== 1) {
			return { message: "Failed to update product", status: 400 };
		}

		return { message: "Product updated successfully", status: 200 };
	} catch (error) {
		console.log(error);
	}
}

async function deleteProduct(id) {
	try {
		const pool = await poolPromise;
		const result = await pool
			.request()
			.input("product_id", sql.Int, id)
			.query(
				"UPDATE Products SET status = 0 WHERE product_id = @product_id"
			);

		if (result.rowsAffected[0] !== 1) {
			return { message: "Product is not available", status: 400 };
		}

		return { message: "Product deleted successfully", status: 200 };
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getAllProduct,
	getProductById,
	addProduct,
	updateProduct,
	deleteProduct,
};
