import { FormControl, TextField, Button, Typography, Alert } from "@mui/material";
import React, { useState } from "react"
import axios from 'axios'
const styles = {
    input: {
        width: "100%",
        marginTop: "5px",
        marginBottom: "5px"
    },
    control: {
        width: "100%",

    }
}

const AddProduct = ({ setOpenAddPopup }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [mediaUrl, setMediaUrl] = useState("");
    const [category, setCategory] = useState("");
    const [success, setSuccess] = useState({})

    const handleAddProduct = async () => {
        const product = {
            title: title,
            author: author,
            price: price,
            mediaUrl: mediaUrl,
            category: category,
            stock: stock,
            description: description,
            publishingDate: new Date()
        }
        try {
            await axios.post("http://localhost:5000/products",
                { product: product }
            )
            setSuccess({ success: true, message: "Produit ajouté avec succès." })
            //setOpenAddPopup(false)
        } catch (e) {
            console.log(e);
            setSuccess({ success: false, message: "Impossible d'ajouter le produit." })

        }
    }
    return (
        <FormControl style={styles.control}>
            <Typography>Ajouter un nouveau produit</Typography>
            <Typography variant="caption">Tous les champs sont requis.</Typography>
            <TextField style={styles.input} label="Titre" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField style={styles.input} label="Auteur" value={author} onChange={(e) => setAuthor(e.target.value)} />
            <TextField style={styles.input} label="Prix" value={price} onChange={(e) => setPrice(e.target.value)} />
            <TextField style={styles.input} label="Media" value={mediaUrl} onChange={(e) => setMediaUrl(e.target.value)} />
            <TextField style={styles.input} label="Catégorie" value={category} onChange={(e) => setCategory(e.target.value)} />
            <TextField style={styles.input} label="Inventaire" value={stock} onChange={(e) => setStock(e.target.value)} />
            <textarea value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)}></textarea>
            <Button variant="contained" onClick={handleAddProduct} disabled={success.success && true}>Ajouter</Button>
            {success.success ? <Alert severity="success">{success.message}</Alert>
                : success.success === false && <Alert severity="error">{success.message}</Alert>}
        </FormControl>
    );
}
export default AddProduct;