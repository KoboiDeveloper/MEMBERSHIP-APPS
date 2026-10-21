import Button from "@/components/Button";
import formatToIDR from "@/utils/formatToIDR";
import React, { FC } from "react";

interface VoucherData {
  id: number;
  voucherCode: string;
  category: string;
  voucherTitle: string;
  nominal: number;
  pointVoucher: number;
  fromDate: string;
  toDate: string;
  status_Voucher: string;
}

type Voucher = {
  handleSubmit: (e: React.FormEvent) => void;
  handleSelectVoucher: (voucherCode: string) => void;
  selectedVoucher: string | null;
  isLoading: boolean;
  data: VoucherData[];
  dataUser: any;
  userPoints: any;
};

const Special: FC<Voucher> = ({
  handleSubmit,
  handleSelectVoucher,
  selectedVoucher,
  isLoading,
  data,
  dataUser,
  userPoints,
}) => {
  return (
    <form onSubmit={handleSubmit} className="w-full mt-4">
      <div className="flex flex-col gap-2">
        {data.map((voucher: VoucherData) => {
          const isDisabled = (userPoints ?? 0) < voucher.pointVoucher;

          return (
            <div
              key={voucher.id}
              className={`p-5 rounded-xl border text-center text-xs ${
                voucher.status_Voucher === "enabled" && !isDisabled
                  ? selectedVoucher === voucher.voucherCode
                    ? "bg-base-accent text-white cursor-pointer"
                    : "hover:bg-gray-100 cursor-pointer"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => {
                if (voucher.status_Voucher === "enabled" && !isDisabled) {
                  handleSelectVoucher(voucher.voucherCode);
                }
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex flex-col items-start gap-2">
                  <span>Voucher Spesial</span>
                  <span className="text-xl">
                    Rp {formatToIDR(voucher.nominal)}
                  </span>
                </div>

                <span className="text-sm">
                  {formatToIDR(voucher.pointVoucher)}{" "}
                  <span className="fontMon uppercase text-[8px] tracking-widest">
                    Poin
                  </span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        {data.length > 0 && (
          <Button
            label="Tukar Poin"
            type="submit"
            className={`bg-base-accent text-white ${isLoading || !selectedVoucher || dataUser.memberInfoData.pos_transaction === true ? "opacity-50 cursor-not-allowed" : ""}`}
            loading={isLoading}
            disabled={
              isLoading ||
              !selectedVoucher ||
              dataUser.memberInfoData.pos_transaction === true
            }
          />
        )}
      </div>
    </form>
  );
};

export default Special;
