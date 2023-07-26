import express from "express";
import { validate } from "./CpfValidator";
import pgp from "pg-promise";

const app = express();
app.use(express.json());

const connection = pgp()("postgresql://sukuna:772010@localhost:5432/app");

app.post("/checkout", async function (req, res) {
    const isValid = validate(req.body.cpf);
    if (!isValid) {
        return res.status(422).json({
            message: "Invalid CPF"
        });
    }

    let total = 0;
    for (const item of req.body.items) {
        // const product = products.find(p => p.idProduct === item.idProduct);
        const [product] = await connection.query("select * from cccat9.product where id_product = $1", [item.idProduct])
        if (product) {
            total += parseFloat(product.price) * item.quantity;
        } else {
            return res.status(422).json({
                message: "Product not found"
            });
        }
    }

    if (req.body.coupon) {
        const [coupon] = await connection.query("select * from cccat9.coupon where code = $1", [req.body.coupon]);
        if (coupon) {
            total -= (total * coupon.percentage) / 100;
        }
    }

    res.json({
        total
    });
});
app.listen(3000);

