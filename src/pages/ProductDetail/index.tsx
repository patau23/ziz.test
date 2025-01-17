import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCartIcon, HeartIcon, StarIcon } from "@heroicons/react/solid";
import Spinner from "../../shared/ui/Spinner";
import styles from "./styles.module.css";
import { useCart } from "../../app/context/cart";
import { useProduct } from "../../app/context/product";

const ProductDetail = () => {
  const { addToCart, items } = useCart();
  const { product, loading, setProductID } = useProduct();
  const findCartItem = items.find((item) => item.id === product.id);

  const { product_id } = useParams();

  useEffect(() => {
    if (product_id) setProductID(product_id);
  }, [product_id]);

  return (
    <>
      {!loading && product?.id ? (
        <div className="flex flex-wrap max-w-7xl mx-auto my-4">
          <div className="w-full sm:w-2/2 md:w-2/2 xl:w-5/5 p-4 flex flex-wrap">
            <img alt="ecommerce" className={styles.image} src={product.image} />
            <div className="lg:w-2/3 w-full lg:pl-10 lg:py-6 my-auto">
              <h2 className={styles.brand}>BRAND</h2>
              <h1 className="text-gray-900 text-2xl font-bold tracking-tight mb-1">
                {product.title}
              </h1>
              <div className={styles.rating} title={`${product?.rating?.rate}`}>
                {[...Array(Math.round(product?.rating?.rate))].map((_, i) => (
                  <StarIcon
                    key={`star-${i}`}
                    className={styles.starIcon}
                    aria-hidden="true"
                  />
                ))}
                {[...Array(5 - Math.round(product?.rating?.rate))].map(
                  (_, i) => (
                    <StarIcon
                      key={`empty-star-${i}`}
                      className={styles.emptyStarIcon}
                      aria-hidden="true"
                    />
                  )
                )}
                <p className="text-xs ml-1 font-light mt-0.5">
                  ({product?.rating?.count})
                </p>
              </div>
              <p className={styles.productDetailText}>{product.description}</p>
              <div className="flex">
                <div className="my-auto">
                  <span className="font-extralight text-2xl inline-block align-middle mt-2 my-auto">
                    $ {product.price}
                  </span>
                </div>
                <div className="block ml-auto my-auto mt-0">
                  {" "}
                  <div className={styles.addToCart}>
                    <button
                      className={styles.addToCartButton}
                      onClick={() => addToCart(product, findCartItem)}
                    >
                      <ShoppingCartIcon
                        className={styles.shoppingCartIcon}
                        aria-hidden="true"
                      />

                      <div className="flex flex-col self-center">
                        <span className={styles.buttonText}>
                          {findCartItem ? "Remove from cart" : "Add to Cart"}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="block my-auto">
                  <button className={styles.favButton}>
                    <HeartIcon className={styles.heartIcon} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default ProductDetail;
