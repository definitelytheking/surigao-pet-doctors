import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../../config/Firebase";

const categoryList = [
  { name: "Shampoo" },
  { name: "Accessories" },
  { name: "Foods" },
  { name: "Toys" },
];

const UpdateProducts = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    productName: "",
    productPrice: "",
    productCategory: "",
    productImage: "",
    productDescription: "",
  });
  const [newProductImage, setNewProductImage] = useState(null);
  const [error, setError] = useState("");

  const types = ["image/png", "image/jpeg"];

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "Products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setNewProductImage(selectedFile);
      setError("");
    } else {
      setNewProductImage(null);
      toast.error("Please select a valid image type (jpg or png)", {
        position: "top-center",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newProductImage) {
      const productImageRef = ref(
        storage,
        `product-images/${newProductImage.name}`
      );
      const uploadTask = uploadBytesResumable(productImageRef, newProductImage);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (err) => {
          setError(err.message);
        },
        async () => {
          try {
            const url = await getDownloadURL(productImageRef);
            await updateDoc(doc(db, "Products", id), {
              ...product,
              productImage: url,
            });
            navigate("/");
            toast.success("Product updated successfully!", {
              position: "top-center",
            });
          } catch (error) {
            toast.error(error.message, {
              position: "top-center",
            });
          }
        }
      );
    } else {
      try {
        await updateDoc(doc(db, "Products", id), product);
        navigate("/admin-dashboard");
        toast.success("Product updated successfully!", {
          position: "top-center",
        });
      } catch (error) {
        toast.error(error.message, {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-[100px]">
      <div className="bg-emerald-300-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <h2 className="text-center text-2xl font-bold text-[#00674f]">
              Edit Product
            </h2>
          </div>

          <div className="mb-3">
            <input
              onChange={handleChange}
              value={product.productName}
              type="text"
              name="productName"
              placeholder="Product Title"
              className="bg-pink-50 text-[#00674f] border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-[#00674f]"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={handleChange}
              value={product.productPrice}
              type="number"
              name="productPrice"
              placeholder="Product Price"
              className="bg-pink-50 text-[#00674f] border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-[#00674f]"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={handleImageChange}
              type="file"
              id="file"
              placeholder="Product Image"
              className="bg-pink-50 text-[#00674f] border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-[#00674f]"
            />
          </div>

          <div className="mb-3">
            <select
              onChange={handleChange}
              value={product.productCategory}
              name="productCategory"
              className="w-full px-1 py-2 text-[#00674f] bg-pink-50 border border-pink-200 rounded-md outline-none"
            >
              <option disabled value="">
                Select Product Category
              </option>
              {categoryList.map((value, index) => (
                <option
                  className="first-letter:uppercase"
                  key={index}
                  value={value.name}
                >
                  {value.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <textarea
              name="productDescription"
              onChange={handleChange}
              value={product.productDescription}
              placeholder="Product Description"
              rows="5"
              className="w-full px-2 py-1 text-[#00674f] bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-[#00674f]"
            ></textarea>
          </div>

          <div className="mb-3">
            <button
              type="submit"
              className="bg-[#00674f] hover:bg-[#00674f9e] w-full text-white text-center py-2 font-bold rounded-md"
            >
              Update Product
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-center mb-3">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UpdateProducts;
