import InquiryForm from './InquiryForm'

function ProductDetail({ product, onBack }) {
  return (
    <section className="product-detail">
      <div className="product-detail-inner">
        <button className="back-btn" onClick={onBack}>
          &larr; Back to Collection
        </button>

        <div className="product-detail-layout">
          <div className="product-detail-image-wrapper">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="product-detail-info">
            <span className="product-category">{product.category}</span>
            <h2>{product.name}</h2>
            <p className="product-detail-price">${product.price.toLocaleString()}</p>
            <p className="product-detail-note">
              Each piece is inspected and authenticated before it reaches you,
              accompanied by its original packaging and documentation.
            </p>

            <InquiryForm productName={product.name} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
