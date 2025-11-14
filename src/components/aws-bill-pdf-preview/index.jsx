const AwsBillPdfPreview = (props) => {
  return (
    <>
      <div className="flex items-center justify-between p-4">
        <div className="text-sm">Bill Period: {props.billingPeriod}</div>
        <div className="text-sm">Account: {props.account}</div>
      </div>
      <div className="">
        {props?.results?.map((result) => {
          return (
            <div className="result-item">
              <div className="flex items-center justify-between bg-[#eff2f7] py-1 pl-4 pr-6 text-[#0066ff]">
                <div className="text-lg font-semibold">{result.subcategory}</div>
                <div className="text-lg font-semibold">${result.subcategoryAmount}</div>
              </div>
              <div className="px-4 pr-6 pb-6 pt-2">
                {result?.details?.map((detail) => {
                  return (
                    <div className="detail-item">
                      <div className="flex items-center justify-between text-sm font-semibold border-b border-[#ccc] py-1 my-1">
                        <div className="detail-subcategory">{detail.title}</div>
                        <div className="detail-subcategory">{detail.amount >= 0 ? `$${detail.amount}` : `($${Math.abs(detail.amount)})`}</div>
                      </div>
                      <div className="pl-4">
                        {detail?.subtotal?.map((subtotalItem) => {
                          return (
                            <div className="subtotal-item">
                              <div className="flex items-center justify-between text-sm">
                                <div className="subtotal-title">{subtotalItem.title}</div>
                                <div className="subtotal-amount">${subtotalItem.amount}</div>
                              </div>
                              <div className="pl-[18px]">
                                {subtotalItem?.rates?.map(({ rate, quantity, amount }) => {
                                  return (
                                    <div className="text-xs grid grid-cols-3 gap-4 text-[#5c6370]">
                                      <div>{rate}</div>
                                      <div className="text-right">{quantity}</div>
                                      <div className="text-right">${amount}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AwsBillPdfPreview;
