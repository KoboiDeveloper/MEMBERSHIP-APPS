"use client";

import Image from "next/image";

// Benefit image
import point from "@/public/images/benefit/Icon poin.png";
import doublepoint from "@/public/images/benefit/Icon double poin.png";
import voucher from "@/public/images/benefit/Icon voucher 50k.png";
import limited from "@/public/images/benefit/Icon limited edition.png";
import freebies from "@/public/images/benefit/Icon freebies.png";
import anualgift from "@/public/images/benefit/Icon annual gift.png";

type ImageMapType = {
  [key: string]: typeof point; // Menggunakan tipe data yang sesuai untuk gambar
};
// Mapping gambar ke nama yang digunakan di data
const imageMap: ImageMapType = {
  point,
  doublepoint,
  voucher,
  limited,
  freebies,
  anualgift,
};

const benefitList = [
  [],
  [
    { id: 1, image: "point", text: "Poin ekstra 1%" },
    { id: 2, image: "doublepoint", text: "Poin 2x saat ulang tahun" },
  ],
  [
    { id: 3, image: "point", text: "Poin ekstra 1,5%" },
    {
      id: 4,
      image: "doublepoint",
      text: "Poin 2x saat ulang tahun & hari besar",
    },
    // { id: 5, image: "voucher", text: "Voucher ulang tahun 50rb" },
  ],
  [
    { id: 6, image: "point", text: "Poin ekstra 2%" },
    {
      id: 7,
      image: "doublepoint",
      text: "Poin 2x saat ulang tahun & hari besar",
    },
    { id: 8, image: "voucher", text: "Voucher ulang tahun 50rb" },
  ],
  [
    { id: 9, image: "point", text: "Poin ekstra 2,5%" },
    {
      id: 10,
      image: "doublepoint",
      text: "Poin 2x saat ulang tahun & hari besar",
    },
    { id: 11, image: "voucher", text: "Voucher ulang tahun 50rb" },
  ],
  [
    { id: 12, image: "point", text: "Poin ekstra 3%" },
    {
      id: 13,
      image: "doublepoint",
      text: "Poin 2x saat ulang tahun & hari besar",
    },
    { id: 14, image: "voucher", text: "Voucher ulang tahun 100rb" },
    { id: 15, image: "limited", text: "Akses edisi terbatas" },
  ],
  [
    { id: 16, image: "point", text: "Poin ekstra 4%" },
    {
      id: 17,
      image: "doublepoint",
      text: "Poin 2x saat ulang tahun & hari besar",
    },
    { id: 18, image: "voucher", text: "Voucher ulang tahun 100rb" },
    { id: 19, image: "limited", text: "Akses edisi terbatas" },
    { id: 20, image: "freebies", text: "Hadiah edisi terbatas" },
  ],
  [
    { id: 21, image: "point", text: "Poin ekstra 5%" },
    {
      id: 22,
      image: "doublepoint",
      text: "Poin 2x saat ulang tahun & hari besar",
    },
    { id: 23, image: "voucher", text: "Voucher ulang tahun 100rb" },
    { id: 24, image: "limited", text: "Akses edisi terbatas" },
    { id: 25, image: "freebies", text: "Hadiah edisi terbatas" },
    {
      id: 26,
      image: "anualgift",
      text: "Hadiah tahunan 10 pembelanja teratas",
    },
  ],
];

interface BenefitBadgeProps {
  activeIndex: number;
}

export default function BenefitBadge({ activeIndex }: BenefitBadgeProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {benefitList[activeIndex]?.map((benefit) => (
        <div
          key={benefit.id}
          className="relative flex flex-row rounded-lg bg-white/10 backdrop-blur-lg border border-white/20 text-white text-sm font-semibold shadow-md h-[42px]"
        >
          <Image
            src={imageMap[benefit.image]}
            width={40}
            height={30}
            alt={benefit.text}
          />
          <span className="text-[8px] fontMon flex items-center mr-1 leading-normal">
            {benefit.text}
          </span>
        </div>
      ))}
    </div>
  );
}
