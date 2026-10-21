"use client";

import Button from "@/components/Button";
import Countdown from "@/components/Countdown";
import ModalQRReward from "@/components/ModalQrReward";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getRewards } from "@/redux/thunks/rewardsThunks";
import { formatDots } from "@/utils/formatDots";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import isVoucherTooOld from "@/utils/isVoucherTooOld";
import PageError from "@/components/PageError";
import { RewardListSkeleton } from "@/components/PageSkeletons";

interface Rewards {
  id: number;
  title: string;
  voucherCode: string;
  expiredDate: string;
  storeAaddress: string;
  image: string;
  termsCondition: string;
  nominal: number;
  status: string;
  voucherDisplay: string;
  voucherStatus: string;
}

export default function Rewards() {
  const dispatch = useAppDispatch();

  const { error, data } = useSelector((state: RootState) => state.rewards);
  const [detail, setDetail] = useState<Rewards | null>(null);

  useEffect(() => {
    dispatch(getRewards());
  }, [dispatch]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalQr, setModalQr] = useState(false);

  const showModal = (id: number) => {
    data.rewardData.find((item: Rewards) => {
      if (item.id === id) {
        setDetail(item);
        return true;
      }
    });
    setIsModalVisible(true);
  };

  const showModalQr = (id: number) => {
    data.rewardData.find((item: Rewards) => {
      if (item.id === id) {
        setDetail(item);
        return true;
      }
    });
    setModalQr(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };
  const handleCloseQrModal = () => {
    setModalQr(false);
  };

  if (data == null) {
    return <RewardListSkeleton />;
  }

  if (error) {
    return <PageError />;
  }

  // Filter: expired lebih dari 1 bulan (30 hari)
  return (
    <>
      {/* card */}
      {data && data.rewardData ? (
        (() => {
          const filteredVouchers = data.rewardData.filter(
            (item: Rewards) => !isVoucherTooOld(item.expiredDate),
          );

          if (filteredVouchers.length === 0) {
            return (
              <p className="text-center text-gray-500">
                Tidak ada voucher yang tersedia.
              </p>
            );
          }

          return filteredVouchers.map((item: Rewards, index: number) => {
            return (
              <div
                className={`bg-white w-full rounded-lg border border-gray-300 flex flex-col items-center justify-between mb-4 ${
                  item.voucherDisplay === "show"
                    ? "cursor-pointer"
                    : "opacity-50 cursor-not-allowed"
                }`}
                onClick={
                  item.voucherDisplay === "show"
                    ? () => showModal(item.id)
                    : () => {}
                }
                key={index}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}gift/${item.image}`}
                  alt="reward"
                  width={1240}
                  height={1240}
                  className="w-auto h-auto rounded-t-lg"
                />
                <div className="flex justify-between items-center w-full p-4 rounded-b-lg">
                  {item.voucherDisplay === "hide" &&
                  item.voucherStatus === "used" ? (
                    <span className="text-[10px] fontMon tracking-wider">
                      TERPAKAI
                    </span>
                  ) : (
                    <span className="">
                      <Countdown targetDate={item.expiredDate} />
                    </span>
                  )}

                  <span className="text-[10px] fontMon">
                    Berlaku hingga: {item.expiredDate}
                  </span>
                </div>
              </div>
            );
          });
        })()
      ) : (
        <p className="text-center text-gray-500">Belum memiliki voucher.</p>
      )}

      {/* open modal */}
      {isModalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50">
          <div className="bg-white w-full max-w-md min-h-screen shadow-lg">
            <div className="flex justify-between items-center p-6">
              <span className="text-[10px] fontMon tracking-wider">REWARD</span>
              <button onClick={closeModal} className="text-black">
                &#10005;
              </button>
            </div>

            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}gift/${detail?.image}`}
              alt="reward"
              width={1240}
              height={1240}
              className="logo"
            />

            <div className="p-4">
              <h2 className="text-center my-3">{detail?.title}</h2>

              {/* Daftar produk */}
              <div className="my-6">
                <div className="border border-gray-300 p-4 rounded-lg">
                  <div className="flex flex-col mb-4">
                    <span className="text-sm mb-1">Kode Voucher</span>
                    <span className="text-[10px] fontMon">
                      {detail?.voucherCode}
                    </span>
                  </div>
                  <div className="flex flex-col mb-4">
                    <span className="text-sm mb-1">Voucher berlaku:</span>
                    <span className="text-[10px] fontMon">
                      {detail?.storeAaddress}
                    </span>
                  </div>
                  <div className="flex justify-center mb-4 pt-4">
                    <Button
                      label="Tampilkan QR"
                      className="bg-base-accent text-white"
                      onClick={() => showModalQr(detail?.id || 0)}
                    />
                  </div>
                </div>
                <div className="flex flex-col m-4">
                  <span className="text-sm mb-5">Syarat & Ketentuan</span>
                  {/* <span className="text-xs">{detail?.termsCondition}</span> */}
                  <ul className="text-xs list-disc marker:text-black">
                    {formatDots(detail?.termsCondition || "").map(
                      (term, index) => (
                        <li key={index} className="list-disc">
                          {term}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal QR code */}
      {modalQr && (
        <ModalQRReward data={detail} closeModal={handleCloseQrModal} />
      )}
    </>
  );
}
