import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Modal,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import { PRODUCTS_API, PRODUCTS_DELETED_API, PRODUCTS_LIST_API } from "../../constants";
import axios from "axios";

const Products = () => {
  const [allProducts, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Number of products per page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editedProductName, setEditedProductName] = useState("");
  const [editedBrand, setEditedBrand] = useState("");
  const [editedRAM, setEditedRAM] = useState("");
  const [editedROM, setEditedROM] = useState("");
  const [editedWeight, setEditedWeight] = useState("");
  const [editedPublisher, setEditedPublisher] = useState("");
  const [editedListPrice, setEditedListPrice] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(PRODUCTS_LIST_API);
      setProducts(response.data); // Assuming response.data is an array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    // Calculate total pages based on filtered products
    const filteredProducts = allProducts.filter(product => 
        product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product._id.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.ram.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.publisher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.listPrice.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    const pages = Math.ceil(filteredProducts.length / productsPerPage);
    setProducts(filteredProducts)
    setTotalPages(pages);

    paginateProducts(currentPage);
  }, [allProducts, searchQuery,searchQuery]); // Run when allProducts or searchQuery changes

  const paginateProducts = (pageNumber) => {
    const startIndex = (pageNumber - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const filteredProducts = allProducts.filter(product =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const productsToShow = filteredProducts.slice(startIndex, endIndex);
    setDisplayedProducts(productsToShow);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setEditedProductName(product.productName);
    setEditedBrand(product.brand);
    setEditedRAM(product.ram);
    setEditedROM(product.rom);
    setEditedWeight(product.weight);
    setEditedPublisher(product.publisher);
    setEditedListPrice(product.listPrice);
    setEditedDescription(product.description);
    setEditModalOpen(true);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    paginateProducts(pageNumber);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedProduct(null);
  };

  const saveEditedProduct = async () => {
    try {
      const updatedProduct = {
        ...selectedProduct,
        productName: editedProductName,
        brand: editedBrand,
        ram: editedRAM,
        rom: editedROM,
        weight: editedWeight,
        publisher: editedPublisher,
        listPrice: editedListPrice,
        description: editedDescription,
      };
      await axios.put(`${PRODUCTS_API}/${selectedProduct._id}`, updatedProduct);

      const updatedProducts = allProducts.map((product) =>
        product._id === selectedProduct._id ? updatedProduct : product
      );
      setProducts(updatedProducts);

      closeEditModal(); // Close the modal after successful update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (product) => {
    try {
      await axios.delete(`${PRODUCTS_DELETED_API}/${product._id}`);

      const updatedProducts = allProducts.filter((p) => p._id !== product._id);
      setProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "2rem" }}>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: "1rem" }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>RAM</TableCell>
              <TableCell>ROM</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Publisher</TableCell>
              <TableCell>List Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.ram}</TableCell>
                <TableCell>{product.rom}</TableCell>
                <TableCell>{product.weight}</TableCell>
                <TableCell>{product.publisher}</TableCell>
                <TableCell>${product.listPrice}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => openEditModal(product)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      deleteProduct(product);
                    }}
                    style={{ marginLeft: "0.5rem" }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={editModalOpen} onClose={closeEditModal}>
        <Container
          maxWidth="sm"
          style={{
            overflow: "auto",
            height: "500px",
            backgroundColor: "white",
            padding: "2rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="h5" gutterBottom>
            Edit Product
          </Typography>
          <Box marginBottom="1rem">
            <TextField
              label="Product Name"
              value={editedProductName}
              onChange={(e) => setEditedProductName(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Brand"
              value={editedBrand}
              onChange={(e) => setEditedBrand(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="RAM"
              value={editedRAM}
              onChange={(e) => setEditedRAM(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="ROM"
              value={editedROM}
              onChange={(e) => setEditedROM(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Weight"
              value={editedWeight}
              onChange={(e) => setEditedWeight(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Publisher"
              value={editedPublisher}
              onChange={(e) => setEditedPublisher(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="List Price"
              value={editedListPrice}
              onChange={(e) => setEditedListPrice(e.target.value)}
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <TextField
              label="Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              margin="normal"
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={saveEditedProduct}
          >
            Save
          </Button>
        </Container>
      </Modal>
      <Box display="flex" justifyContent="center" marginTop="2rem">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "contained" : "outlined"}
            onClick={() => handlePageChange(i + 1)}
            style={{ margin: "0 0.5rem" }}
          >
            {i + 1}
          </Button>
        ))}
      </Box>
    </Container>
  );
};

export default Products;
