import { useState, useEffect } from "react";

export default function ShoppingComponent() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [itemsCount, setItemsCount] = useState(0);

    function GetCartItemsCount(items) {
        setItemsCount(items.length);
    }

    // LOAD CATEGORIES
    function LoadCategories() {
        fetch("https://fakestoreapi.com/products/categories")
            .then((response) => response.json())
            .then((data) => {
                data.unshift("all");
                setCategories(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // LOAD PRODUCTS
    function LoadProducts(url) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // INITIAL LOAD
    useEffect(() => {
        LoadCategories();

        LoadProducts(
            "https://fakestoreapi.com/products"
        );
    }, []);

    // CATEGORY CHANGE
    function handleCategoryChange(e) {
        const category = e.target.value;

        if (category === "all") {
            LoadProducts(
                "https://fakestoreapi.com/products"
            );
        } else {
            LoadProducts(
                `https://fakestoreapi.com/products/category/${category}`
            );
        }
    }

    // ADD TO CART
    function handleAddtoCart(e) {
       
        const productId = e.currentTarget.id;

        fetch(
            `https://fakestoreapi.com/products/${productId}`
        )
            .then((response) => response.json())
            .then((data) => {

                setCartItems((previousItems) => {

                    // Check whether product is already in cart
                    const alreadyExists = previousItems.some(
                        (item) => item.id === data.id
                    );

                    if (alreadyExists) {
                        alert("⚠️🛒 This item is already in your cart!");
                        return previousItems;
                    }
                    alert("🛒 Item Added to Cart");

                    const newCartItems = [
                        ...previousItems,
                        data
                    ];
                    
                    GetCartItemsCount(newCartItems);

                    return newCartItems;
                });

            })
            .catch((error) => {
                console.log(error);
            });
    }

    // REMOVE FROM CART
    function handleRemoveFromCart(id) {
        setCartItems((previousItems) => {

            const newCartItems = previousItems.filter(
                (item) => item.id !== id
            );

            GetCartItemsCount(newCartItems);

            return newCartItems;
        });
    }

    return (
        <div className="container-fluid">

            {/* HEADER */}

            <header className="shopping-header">
                <h1>
                    <span className="bi bi-cart"></span>
                    &nbsp;
                    Flipkart Shopping Home
                </h1>
            </header>


            <section className="row mt-4">

                {/* CATEGORY */}

                <nav className="col-lg-2 col-md-3 mb-3">

                    <div className="category-box">

                        <label>
                            Select a Category
                        </label>

                        <select
                            onChange={handleCategoryChange}
                            className="form-select"
                        >

                            {categories.map(
                                (category) => (
                                    <option
                                        value={category}
                                        key={category}
                                    >
                                        {category.toUpperCase()}
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                </nav>


                {/* PRODUCTS */}

                <main className="col-lg-6 col-md-9 product-area">

                    {products.map(
                        (product) => (

                            <div
                                key={product.id}
                                className="card product-card"
                            >

                                {/* IMAGE */}

                                <img
                                    src={product.image}
                                    className="card-img-top product-image"
                                    alt={product.title}
                                />


                                {/* TITLE */}

                                <div className="card-header product-title">

                                    <p>
                                        {product.title}
                                    </p>

                                </div>


                                {/* DETAILS */}

                                <div className="card-body">

                                    <dl>

                                        <dt>
                                            Price
                                        </dt>

                                        <dd className="price">
                                            ₹ {product.price}
                                        </dd>


                                        <dt>
                                            Rating
                                        </dt>

                                        <dd>

                                            <span className="bi bi-star-fill rating-star"></span>

                                            &nbsp;

                                            {product.rating.rate}

                                            <span className="rating-count">
                                                &nbsp;[
                                                {product.rating.count}
                                                ]
                                            </span>

                                        </dd>

                                    </dl>

                                </div>


                                {/* ADD TO CART */}

                                <div className="card-footer">

                                    <button
                                        id={product.id}
                                        onClick={handleAddtoCart}
                                        className="btn btn-danger w-100"
                                    >

                                        <span className="bi bi-cart4"></span>

                                        &nbsp;

                                        Add to Cart

                                    </button>

                                </div>

                            </div>

                        )
                    )}

                </main>


                {/* CART */}

                <aside className="col-lg-4 mt-3 mt-lg-0">

                    <div className="cart-box">

                        {/* CART HEADER */}

                        <button className="btn btn-danger w-100 cart-heading">

                            <span className="bi bi-cart3"></span>

                            &nbsp;

                            [{itemsCount}]

                            &nbsp;

                            Your Cart Items

                        </button>


                        {/* EMPTY CART */}

                        {cartItems.length === 0 ? (

                            <div className="empty-cart">

                                <span className="bi bi-cart-x"></span>

                                <p>
                                    Your cart is empty
                                </p>

                            </div>

                        ) : (

                            /* CART ITEMS */

                            <div className="table-responsive">

                                <table className="table table-hover">

                                    <thead>

                                        <tr>

                                            <th>
                                                Title
                                            </th>

                                            <th>
                                                Price
                                            </th>

                                            <th>
                                                Preview
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {cartItems.map(
                                            (item) => (

                                                <tr key={item.id}>

                                                    {/* TITLE */}

                                                    <td>

                                                        <span className="cart-title">
                                                            {item.title}
                                                        </span>

                                                    </td>


                                                    {/* PRICE */}

                                                    <td>
                                                        ₹ {item.price}
                                                    </td>


                                                    {/* IMAGE */}

                                                    <td>

                                                        <img
                                                            src={item.image}
                                                            width="50"
                                                            height="50"
                                                            className="cart-image"
                                                            alt={item.title}
                                                        />

                                                    </td>


                                                    {/* DELETE */}

                                                    <td>

                                                        <button
                                                            className="btn btn-danger delete-button"
                                                            onClick={() =>
                                                                handleRemoveFromCart(
                                                                    item.id
                                                                )
                                                            }
                                                        >

                                                            <span className="bi bi-trash"></span>

                                                        </button>

                                                    </td>

                                                </tr>

                                            )
                                        )}

                                    </tbody>

                                </table>
{/* TOTAL PRICE HERE */}
    <div className="total-price">
        <strong>
            Total Price: ₹
            {cartItems
                .reduce((total, item) => total + item.price, 0)
                .toFixed(2)}
        </strong>
    </div>
                            </div>

                        )}

                    </div>

                </aside>

            </section>

        </div>
    );
}