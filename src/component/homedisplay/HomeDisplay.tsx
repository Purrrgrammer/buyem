const HomeDisplay = () => {
  return (
    <div>
      <div className="menwomen">
        <div className="d-flex justify-content-center">
          <div className="section-block-men">
            <div className="men">Men</div>
          </div>
          <div className="section-block-women">
            <div className="women">Women</div>
          </div>
        </div>
      </div>
      <div className="others">
        <div className="d-flex justify-content-center">
          <div className="section-block jeweries">
            <div className="etc">Jeweries</div>
          </div>
          <div className="section-block electronics">
            <div className="etc electronicsfont">Electronics</div>
          </div>
          <div className="section-block others">
            <div className="etc">etc.</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeDisplay;
