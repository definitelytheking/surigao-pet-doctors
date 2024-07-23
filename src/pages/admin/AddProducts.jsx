import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db, storage } from "../../config/Firebase";

const categoryList = [
  {
    name: "Shampoo",
  },
  {
    name: "Accessories",
  },
  {
    name: "Foods",
  },
  {
    name: "Toys",
  },
];

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");
  const [error, setError] = useState(""); // Add error state

  const types = ["image/png", "image/jpeg"];

  const productImageHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setProductImage(selectedFile);
      setError("");
    } else {
      setProductImage(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const productImageRef = ref(storage, `product-images/${productImage.name}`);
    const uploadTask = uploadBytesResumable(productImageRef, productImage);

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
          await addDoc(collection(db, "Products"), {
            productName: productName,
            productPrice: Number(productPrice),
            productCategory: productCategory,
            productImage: url,
            productDescription: productDescription,
          });

          setProductName("");
          setProductPrice("");
          setProductCategory("");
          setProductImage(null);
          setProductDescription("");
          document.getElementById("file").value = "";
          toast.success("Product added successfully!", {
            position: "top-center",
          });
        } catch (error) {
          toast.error(error.message, {
            position: "top-center",
          });
        }
      }
    );
  };

  return (
    <div>
      <div className="flex justify-center items-center py-[100px]">
        <div className="bg-emerald-300-50 px-8 py-6 border border-pink-100 rounded-xl shadow-md">
          <form onSubmit={addProduct}>
            <div className="mb-5">
              <h2 className="text-center text-2xl font-bold text-[#00674f]">
                Add Product
              </h2>
            </div>

            {/* Input One */}
            <div className="mb-3">
              <input
                onChange={(e) => setProductName(e.target.value)}
                value={productName}
                type="text"
                name="title"
                placeholder="Product Title"
                className="bg-pink-50 text-[#00674f] border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-[#00674f]"
              />
            </div>

            {/* Input Two */}
            <div className="mb-3">
              <input
                onChange={(e) => setProductPrice(e.target.value)}
                value={productPrice}
                type="number"
                placeholder="Product Price"
                className="bg-pink-50 text-[#00674f] border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-[#00674f]"
              />
            </div>

            {/* Input Three */}
            <div className="mb-3">
              <input
                onChange={productImageHandler}
                type="file"
                id="file"
                placeholder="Product Image Url"
                className="bg-pink-50 text-[#00674f] border border-pink-200 px-2 py-2 w-96 rounded-md outline-none placeholder-[#00674f]"
              />
            </div>

            {/* Input Four */}
            <div className="mb-3">
              <select
                onChange={(e) => setProductCategory(e.target.value)}
                value={productCategory}
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

            {/* Input Five */}
            <div className="mb-3">
              <textarea
                name="description"
                onChange={(e) => setProductDescription(e.target.value)}
                value={productDescription}
                placeholder="Product Description"
                rows="5"
                className="w-full px-2 py-1 text-[#00674f] bg-pink-50 border border-pink-200 rounded-md outline-none placeholder-[#00674f]"
              ></textarea>
            </div>

            {/* Add Product Button */}
            <div className="mb-3">
              <button
                type="submit"
                className="bg-[#00674f] hover:bg-[#00674f9e] w-full text-white text-center py-2 font-bold rounded-md"
              >
                Add Product
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-center mb-3">{error}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
