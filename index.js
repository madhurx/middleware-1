const express = require("express");
const zod = require("zod");

const app = express();
app.use(express.json());

const schema = zod.object({
    email:zod.string(),
    password:zod.string(),
    country:zod.literal("IN").or(zod.literal("US")),
    kidneys:zod.array(zod.ZodNumber())
})

app.post("/health-checkup", (req, res) => {
	const kidneys = req.body.kidneys;
	const response = schema.safeParse(kidneys);
    if(!response.success){
        return res.status(401).send(response.error);
    }
    else{
        return res.status(200).send(response.data);
    }
	res.send(response);
});


app.use(function (err, req, res, next) {
	res.json({ msg: "sorry, something went wrong with our server" });
});

app.listen(3000);
