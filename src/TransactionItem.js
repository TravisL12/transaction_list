import React, { useState } from "react";

const DATE_FORMAT_OPTIONS = {
  month: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

function TransactionItem({ transaction, categories, saveMemo, saveCategory }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [memoInputText, setMemoInputText] = useState(null);

  const {
    id,
    categoryId,
    merchant,
    amount,
    memo,
    cardAcceptor,
    accrualDate,
  } = transaction;

  const category = categories[categoryId];

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const updateMemoText = (event) => {
    setMemoInputText(event.target.value);
  };

  return (
    <div className="TransactionItem">
      <div className="TransactionItem__overview" onClick={toggleDrawer}>
        <div className="TransactionItem__merchant">
          <div className="merchant--title">{merchant.name}</div>
          <div className="merchant--info">
            <span>
              {new Date(accrualDate).toLocaleString(
                "en-US",
                DATE_FORMAT_OPTIONS
              )}
            </span>
            <span>{category.name}</span>
            <span>{cardAcceptor.captureMethod}</span>
          </div>
        </div>

        {/* Amount is in cents!!!! */}
        <div className="TransactionItem__amount">
          {amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </div>

        <div className="TransactionItem__memo">
          {memo && <span className="memo-icon">M</span>}
        </div>
      </div>
      {isDrawerOpen && (
        <div className="TransactionItem__drawer">
          <div className="drawer_details drawer-column">
            <div className="drawer-title">Details</div>

            <div className="details-column">
              <div className="detail-item">
                <div className="detail-description">Transaction type</div>
                <div className="detail-value">{cardAcceptor.captureMethod}</div>
              </div>
              <div className="detail-item">
                <div className="detail-description">Mercant address</div>
                <div className="detail-value">{merchant.address}</div>
              </div>
              <div className="detail-item">
                <div className="detail-description">Merchant name</div>
                <div className="detail-value">{merchant.name}</div>
              </div>
              <div className="detail-item">
                <div className="detail-description">Website</div>
                <div className="detail-value">
                  <a target="blank" no-refer="true" href={merchant.website}>
                    {merchant.website}
                  </a>
                </div>
              </div>
              <div className="detail-item">
                <div className="detail-description">Category</div>
                <div className="detail-value">
                  <select
                    value={category.id}
                    onChange={(event) => {
                      saveCategory(id, event.target.value);
                    }}
                  >
                    {Object.values(categories).map((cat, idx) => {
                      return (
                        <option key={idx} value={cat.id}>
                          {cat.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="drawer_memo drawer-column">
            <div className="drawer-title">Memo</div>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                saveMemo(id, memoInputText);
              }}
            >
              <div className="memo-input">
                <textarea
                  onChange={updateMemoText}
                  placeholder="No memo for this transaction"
                  value={memo || ""}
                ></textarea>
              </div>
              <div className="memo-submit">
                <button>Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TransactionItem;
