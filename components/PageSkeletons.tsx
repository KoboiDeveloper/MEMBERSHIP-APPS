import Image from "next/image";
import React from "react";
import Header from "@/components/Header";
import MenuAccount from "@/components/MenuAccount";
import TabBar from "@/components/TabBar";
import { Skeleton } from "@/components/Skeleton";
import tiergroup from "@/public/images/tiergroup.svg";
import Misi from "@/public/images/CRM-Mission.svg";
import Lucky from "@/public/images/CRM-Lucky draw.svg";
import Referral from "@/public/images/CRM-Referral.svg";
import Promo from "@/public/images/CRM-Promo.svg";

// Skeleton per halaman. Elemen statis (judul, tab, label, ikon) memakai markup
// asli halamannya; hanya bagian data yang diganti blok abu-abu.

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex justify-center items-center"
      role="status"
      aria-busy="true"
      aria-label="Memuat"
    >
      <div className="flex flex-col items-center w-full max-w-md bg-white md:rounded-lg min-h-screen">
        {children}
      </div>
    </div>
  );
}

function ArrowLeftWhite() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-auto h-auto absolute"
    >
      <path
        d="M4 12L3.64645 11.6464L3.29289 12L3.64645 12.3536L4 12ZM19 12.5C19.2761 12.5 19.5 12.2761 19.5 12C19.5 11.7239 19.2761 11.5 19 11.5V12.5ZM9.64645 5.64645L3.64645 11.6464L4.35355 12.3536L10.3536 6.35355L9.64645 5.64645ZM3.64645 12.3536L9.64645 18.3536L10.3536 17.6464L4.35355 11.6464L3.64645 12.3536ZM4 12.5H19V11.5H4V12.5Z"
        fill="white"
      />
    </svg>
  );
}

function FieldSkeleton({ label }: { label: string }) {
  return (
    <div className="mb-4">
      <span className="block text-xs mb-2 text-gray-700 skeleton-text">
        {label}
      </span>
      <Skeleton className="h-[46px] w-full rounded-lg" />
    </div>
  );
}

// Header halaman berlatar gelap (faq, bantuan)
function DarkIntroHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col bg-base-accent text-white rounded-b-3xl p-8 w-full">
      <div className="flex items-center">
        <ArrowLeftWhite />
        <div className="flex-grow flex justify-center">
          <span className="text-xl skeleton-text-dark">{title}</span>
        </div>
      </div>
      <p className="text-[10px] text-center tracking-wider my-6 fontMon leading-relaxed skeleton-text-dark">
        {description}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------- Halaman

export function HomeSkeleton() {
  return (
    <Frame>
      <div className="bg-base-accent w-full relative overflow-hidden mb-20">
        <div className="flex justify-between items-center px-8 pt-8 pb-5">
          <Skeleton tone="dark" className="h-6 w-32" />
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[7px] fontMon uppercase tracking-widest text-white skeleton-text-dark">
                Tier
              </span>
              <Skeleton tone="dark" className="h-4 w-14" />
            </div>
            <Skeleton tone="dark" className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <div className="flex justify-center items-center w-full mb-8 px-8">
          <div className="relative w-full h-[210px] sm:h-[220px] md:h-[230px] rounded-xl bg-white/10 overflow-hidden">
            <div className="absolute inset-0 flex flex-row items-start justify-between p-4">
              <div className="flex flex-col gap-2">
                <Skeleton tone="dark" className="h-4 w-28" />
                <span className="text-[7px] fontMon text-white/70 tracking-widest skeleton-text-dark">
                  MEMBER SEJAK
                </span>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Skeleton tone="dark" className="h-4 w-16" />
                <span className="text-[7px] fontMon text-white/70 tracking-widest skeleton-text-dark">
                  TOTAL POIN
                </span>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <Skeleton tone="dark" className="h-4 w-24" />
              <span className="text-[8px] fontMon tracking-widest text-white/70 skeleton-text-dark">
                TIER
              </span>
            </div>
            <div className="absolute inset-0 flex items-end justify-between p-4">
              <div className="bg-white/20 flex p-2 rounded gap-1">
                <Image
                  src="/images/graf-up.svg"
                  alt="Grafik"
                  width={10}
                  height={12}
                  className="opacity-60"
                />
                <span className="text-[8px] fontMon tracking-widest text-white/70 skeleton-text-dark">
                  RIWAYAT TIER
                </span>
              </div>
              <div className="bg-white/20 flex p-2 rounded gap-1">
                <Image
                  src="/images/qr.svg"
                  alt="Barcode"
                  width={10}
                  height={12}
                  className="opacity-60"
                />
                <span className="text-[8px] fontMon tracking-widest text-white/70 skeleton-text-dark">
                  TAMPILKAN ID
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-white pt-8 px-8 rounded-t-3xl">
          <div className="flex justify-between items-center">
            {[
              { src: Misi, label: "Misi" },
              { src: Lucky, label: "Undian" },
              { src: Referral, label: "Referral" },
              { src: Promo, label: "Promo" },
            ].map((menu) => (
              <div
                key={menu.label}
                className="flex flex-col justify-center items-center gap-2 w-16 opacity-60"
              >
                <Image
                  src={menu.src}
                  width={50}
                  height={50}
                  alt={menu.label}
                  className="w-auto h-full rounded-md bg-white"
                />
                <span className="text-[10px] skeleton-text">{menu.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col py-8 gap-2">
            <Skeleton className="w-full h-52 rounded-lg" />
            <span className="text-[8px] tracking-wider mt-2 fontMon self-end skeleton-text">
              LIHAT SEMUA
            </span>
            <h2 className="text-lg mb-4 skeleton-text">Brand Kami</h2>
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-24 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="skeleton-hide-text">
        <TabBar />
      </div>
    </Frame>
  );
}

export function AccountSkeleton() {
  return (
    <Frame>
      <div className="flex flex-col items-center p-8 bg-base-accent rounded-b-3xl w-full">
        <div className="flex justify-between items-center pb-5 w-full">
          <Skeleton tone="dark" className="h-6 w-40" />
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-end gap-1">
              <span className="text-[7px] fontMon uppercase tracking-widest text-white skeleton-text-dark">
                Tier
              </span>
              <Skeleton tone="dark" className="h-4 w-14" />
            </div>
            <Skeleton tone="dark" className="h-10 w-10 rounded-full" />
          </div>
        </div>

        <div className="bg-white w-full rounded-xl flex justify-between p-4">
          <div className="flex flex-col gap-1">
            <small className="text-[9px] fontMon tracking-wider skeleton-text">
              TOTAL POIN
            </small>
            <Skeleton className="h-6 w-20" />
            <span className="text-[8px] tracking-wider fontMon skeleton-text">
              Lihat Riwayat
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <small className="text-[9px] fontMon tracking-wider skeleton-text">
              TOTAL VOUCHER
            </small>
            <Skeleton className="h-6 w-10" />
            <span className="text-[8px] tracking-wider fontMon skeleton-text">
              Lihat Voucher
            </span>
          </div>
          <div className="my-auto">
            <div className="flex items-center justify-center border border-base-accent rounded-lg p-2 gap-2">
              <span className="text-[9px] tracking-wider skeleton-text">
                Tampilkan ID
              </span>
              <Image
                src="/images/qr.svg"
                width={50}
                height={50}
                alt="qr"
                className="w-auto h-auto"
              />
            </div>
          </div>
        </div>

        <div className="bg-white w-full rounded-xl flex justify-between p-4 mt-2 h-14">
          <div className="flex">
            <Image
              src={tiergroup}
              width={50}
              height={50}
              alt="tier"
              className="w-auto h-auto"
            />
            <span className="text-[10px] ml-2 w-[100px] my-auto skeleton-text">
              Lihat benefit tier
            </span>
          </div>
          <Image
            src="/images/arrow-right.svg"
            width={30}
            height={30}
            alt="arrow"
            className="w-auto h-auto"
          />
        </div>
      </div>

      <div className="skeleton-hide-text w-full">
        <MenuAccount />
      </div>
      <span className="pb-24 my-3 underline underline-offset-4 text-sm tracking-wider skeleton-text">
        KELUAR
      </span>
      <div className="skeleton-hide-text">
        <TabBar />
      </div>
    </Frame>
  );
}

export function TransactionSkeleton() {
  return (
    <Frame>
      <div className="w-full">
        <div className="flex flex-col bg-base-accent rounded-b-3xl py-8 items-center w-full">
          <Skeleton
            tone="dark"
            className="w-96 max-w-[90%] h-[190px] rounded-xl mb-3"
          />
          <div className="w-full px-8">
            <div className="flex flex-row justify-between mb-3 fontMon tracking-wider uppercase text-white">
              <span className="text-[10px] mt-1 skeleton-text-dark">
                Keuntungan :
              </span>
              <span className="bg-grey/10 text-[8px] shadow-lg border border-white/20 rounded-full px-3 py-1 skeleton-text-dark">
                Info Benefit
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} tone="dark" className="h-[42px] rounded-lg" />
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center text-[8px] fontMon items-center p-4 mt-5 mb-4 bg-gray-200 uppercase tracking-widest skeleton-text">
          Riwayat Transaksi
        </div>

        <div className="flex flex-col items-center justify-center p-4 mb-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-base-accent p-4 w-full rounded-lg border border-gray-300 flex items-center justify-between mb-4"
            >
              <div className="flex flex-col space-y-6 w-1/2">
                <div className="flex flex-col gap-2">
                  <Skeleton tone="dark" className="h-3 w-24" />
                  <Skeleton tone="dark" className="h-2 w-32" />
                </div>
                <Skeleton tone="dark" className="h-2 w-20" />
              </div>
              <div className="w-px h-16 bg-gray-300" />
              <div className="flex flex-col items-end gap-2">
                <span className="text-[8px] fontMon tracking-widest uppercase text-white skeleton-text-dark">
                  Total
                </span>
                <Skeleton tone="dark" className="h-3 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="skeleton-hide-text">
        <TabBar />
      </div>
    </Frame>
  );
}

function FilterTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-between mt-8">
      <span className="text-[10px] tracking-wider uppercase fontMon skeleton-text">
        {title}
      </span>
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/images/filter.svg"
          alt="Filter"
          width={100}
          height={100}
          className="w-auto h-auto"
        />
        <span className="text-[10px] fontMon skeleton-text">FILTER</span>
      </div>
    </div>
  );
}

export function HistoryTransactionSkeleton() {
  return (
    <Frame>
      <div className="bg-base-accent min-h-screen w-full">
        <Header>
          <FilterTitle title="RIWAYAT TRANSAKSI" />
        </Header>
        <div className="flex flex-col items-center justify-center p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <TransactionRowSkeleton key={i} />
          ))}
        </div>
      </div>
    </Frame>
  );
}

function TransactionRowSkeleton() {
  return (
    <div className="bg-white p-4 w-full rounded-lg border border-gray-300 flex items-center justify-between mb-4">
      <div className="flex flex-col space-y-6 w-1/2">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-2 w-32" />
        </div>
        <Skeleton className="h-2 w-20" />
      </div>
      <div className="w-px h-16 bg-gray-300" />
      <div className="flex flex-col items-end gap-2">
        <span className="text-[8px] fontMon uppercase tracking-wider skeleton-text">
          Total
        </span>
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
  );
}

export function HistoryTierSkeleton() {
  return (
    <Frame>
      <div className="bg-base-accent min-h-screen w-full">
        <Header>
          <div className="flex items-center justify-between mt-8">
            <span className="text-[10px] fontMon tracking-widest skeleton-text">
              RIWAYAT TIER
            </span>
            <div className="flex items-center gap-2">
              <Image
                src="/images/filter.svg"
                alt="Filter"
                width={100}
                height={100}
                className="w-auto h-auto"
              />
              <span className="text-[10px] fontMon tracking-widest skeleton-text">
                FILTER
              </span>
            </div>
          </div>
        </Header>
        <div className="flex flex-col items-center p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 w-full rounded-lg border border-gray-300 flex items-center justify-between mb-4"
            >
              <Skeleton className="h-3 w-28" />
              <div className="flex items-center justify-center gap-2">
                <div className="flex flex-col items-end gap-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-2 w-16" />
                </div>
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function PromoSkeleton() {
  return (
    <Frame>
      <div className="bg-base-accent w-full min-h-screen">
        <Header>
          <div className="flex items-center justify-between mt-8">
            <span className="text-[10px] fontMon tracking-widest skeleton-text">
              PROMO BERLAKU
            </span>
          </div>
        </Header>
        <div className="p-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white w-full rounded-lg flex flex-col mb-4 shadow-lg overflow-hidden"
            >
              <Skeleton className="w-full h-52 rounded-none" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-2 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function StoreSkeleton() {
  return (
    <Frame>
      <div className="bg-base-accent w-full min-h-screen">
        <Header>
          <div className="flex items-center justify-between mt-4">
            <span className="text-[10px] tracking-widest fontMon skeleton-text">
              LOKASI TOKO
            </span>
          </div>
        </Header>
        <div className="p-4 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function StoreBrandSkeleton() {
  return (
    <Frame>
      <div className="bg-base-accent w-full min-h-screen">
        <Header>
          <div className="flex items-center justify-between mt-4">
            <span className="text-[10px] tracking-widest fontMon skeleton-text">
              LOKASI TOKO
            </span>
            <Image
              src="/images/search.svg"
              alt="Cari"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
        </Header>
        <div className="flex flex-col items-center justify-center p-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="bg-white px-4 py-6 w-full rounded-lg border border-gray-300 flex items-center justify-between mb-4"
            >
              <Skeleton className="h-4 w-40" />
              <Image
                src="/images/location.svg"
                alt="lokasi"
                width={100}
                height={100}
                className="w-auto h-auto opacity-40"
              />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function TierInfoSkeleton() {
  return (
    <Frame>
      <div className="min-h-screen w-full">
        <div className="flex flex-col bg-white rounded-b-3xl p-8">
          <div className="flex items-center">
            <Image
              src="/images/arrow-left.svg"
              alt="Arrow Left"
              width={30}
              height={30}
              className="w-auto h-auto absolute"
            />
            <div className="flex-grow flex justify-center">
              <span className="text-xl skeleton-text">Tier Member</span>
            </div>
          </div>
          <p className="text-[10px] text-center tracking-wider my-6 fontMon leading-relaxed skeleton-text">
            Penentuan tier member berdasarkan total transaksi belanja, setiap
            tingkatan tier memiliki benefit yang berbeda seperti penambahan
            nilai poin dan akses benefit lainnya
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Skeleton className="w-80 h-40 rounded-xl mb-3" />
          <Skeleton className="h-10 w-48 rounded-xl" />
        </div>
        <div className="p-8">
          <Skeleton className="h-7 w-40 mx-auto" />
          <div className="p-6 w-full space-y-3">
            <h2 className="mb-2 skeleton-text">Keuntungan</h2>
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-3 w-full" />
            ))}
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function FaqSkeleton() {
  return (
    <Frame>
      <div className="min-h-screen bg-white w-full">
        <DarkIntroHeader
          title="FAQ"
          description="Temukan jawaban atas pertanyaan umum seputar layanan kami di halaman FAQ ini. Kami telah merangkum informasi penting untuk membantu Anda memahami lebih baik fitur dan layanan yang tersedia."
        />
        <div className="p-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="border-b border-gray-200 py-4">
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function HelpSkeleton() {
  return (
    <Frame>
      <div className="min-h-screen bg-white w-full">
        <DarkIntroHeader
          title="Bantuan"
          description="Jika Anda membutuhkan bantuan atau memiliki pertanyaan terkait layanan ini, silakan hubungi kami melalui informasi kontak yang tersedia di bawah ini. Tim kami siap membantu Anda."
        />
        <div className="p-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white p-4 w-full rounded-lg border border-gray-300 flex items-center gap-4 mb-4"
            >
              <Skeleton className="h-5 w-5 shrink-0" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function LuckyDrawSkeleton() {
  return (
    <Frame>
      <div className="bg-white w-full max-w-md shadow-lg relative">
        <div className="flex justify-between items-center p-6">
          <span className="text-xs skeleton-text">UNDIAN</span>
          <span className="text-black">&#10005;</span>
        </div>
        <Skeleton className="w-full aspect-[4/3] rounded-none" />
        <div className="p-6">
          <Skeleton className="h-5 w-2/3 mx-auto my-3" />
          <div className="my-6 space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
          <Skeleton className="h-3 w-48 mx-auto mb-4" />
          <Skeleton className="h-14 w-72 max-w-full rounded-full mx-auto" />
          <hr className="my-6" />
          <div className="flex justify-end items-center">
            <Skeleton className="h-3 w-24" />
          </div>
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="bg-[#E0DDD4] w-full my-4 p-2 shadow-sm">
              <div className="border-dashed border-2 border-gray-500 p-2 space-y-2">
                <Skeleton className="h-3 w-1/2 bg-white/60" />
                <Skeleton className="h-2 w-1/3 bg-white/60" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}

export function RedeemSkeleton() {
  return (
    <Frame>
      <div className="flex flex-col m-8 w-full">
        <div className="flex flex-col px-8">
          <div className="flex items-center">
            <Image
              src="/images/arrow-left.svg"
              alt="Arrow Left"
              width={30}
              height={30}
              className="w-auto h-auto absolute"
            />
            <div className="flex-grow flex justify-center">
              <span className="text-xl skeleton-text">Tukar Poin</span>
            </div>
          </div>
          <div className="flex justify-evenly items-center my-8">
            <span className="text-xs font-medium underline underline-offset-8 skeleton-text">
              Voucher Belanja
            </span>
            <span className="text-xs font-medium skeleton-text">
              Penawaran Spesial
            </span>
          </div>
          <div className="flex flex-col justify-center text-center items-center mt-4">
            <span className="text-xs skeleton-text">
              Tukarkan poin menjadi voucher belanja
            </span>
            <div className="flex flex-col justify-center items-center mt-10 gap-2">
              <span className="text-[10px] fontMon tracking-wider skeleton-text">
                TOTAL POIN
              </span>
              <Skeleton className="h-6 w-28" />
            </div>
            <div className="mt-10 mb-4">
              <span className="text-xs skeleton-text">
                Nominal poin yang akan ditukar
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-11 w-full rounded-none" />
              ))}
            </div>
            <Skeleton className="h-14 w-72 max-w-full rounded-full mt-12" />
          </div>
        </div>
      </div>
    </Frame>
  );
}

export function ProfileSkeleton() {
  return (
    <Frame>
      <div className="flex flex-col p-8 w-full">
        <div className="flex items-center">
          <Image
            src="/images/arrow-left.svg"
            alt="Arrow Left"
            width={30}
            height={30}
            className="w-auto h-auto absolute"
          />
          <div className="flex-grow flex justify-center">
            <h1 className="text-lg font-medium skeleton-text">Edit Profil</h1>
          </div>
        </div>
        <p className="text-xs mt-4 mb-8 skeleton-text">
          Pastikan data diperbaharui dengan benar
        </p>
        <FieldSkeleton label="No. Handphone" />
        <FieldSkeleton label="Nama Lengkap" />
        <FieldSkeleton label="Alamat Email" />
        <FieldSkeleton label="Provinsi" />
        <FieldSkeleton label="Kota" />
        <FieldSkeleton label="Jenis Kelamin" />
        <FieldSkeleton label="Tanggal Lahir" />
        <small className="text-[9px] fontMon skeleton-text">
          * Untuk mengubah tanggal lahir, silahkan hubungi admin
        </small>
        <div className="mt-4 flex justify-center">
          <Skeleton className="h-14 w-72 max-w-full rounded-full" />
        </div>
      </div>
    </Frame>
  );
}

export function ValidasiFormSkeleton() {
  return (
    <Frame>
      <div className="flex flex-col p-8 w-full">
        <h1 className="text-lg font-medium skeleton-text">Validasi Data</h1>
        <p className="text-xs mt-4 mb-8 fontMon leading-relaxed skeleton-text">
          Harap lengkapi data diri dan pastikan data yang dimasukkan benar.
        </p>
        <FieldSkeleton label="*Nama Lengkap" />
        <FieldSkeleton label="No. Handphone" />
        <FieldSkeleton label="*Alamat Email" />
        <FieldSkeleton label="*Provinsi" />
        <FieldSkeleton label="*Kota" />
        <FieldSkeleton label="*Tanggal Lahir" />
        <FieldSkeleton label="*Jenis Kelamin" />
        <FieldSkeleton label="*Password" />
        <FieldSkeleton label="*PIN (6 digit angka)" />
        <div className="mt-4 flex justify-center">
          <Skeleton className="h-14 w-72 max-w-full rounded-full" />
        </div>
      </div>
    </Frame>
  );
}

// ------------------------------------------------- Konten tab (tanpa header)

const TabWrapper = ({ children }: { children: React.ReactNode }) => (
  <div role="status" aria-busy="true" aria-label="Memuat" className="w-full">
    {children}
  </div>
);

export function MissionCardsSkeleton() {
  return (
    <TabWrapper>
      <div className="pb-8">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="px-4 pt-4">
            <div className="bg-white w-full rounded-lg flex flex-col shadow-lg overflow-hidden">
              <Skeleton className="w-full h-52 rounded-none" />
              <div className="p-4">
                <Skeleton className="h-7 w-24 mb-4" />
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-2/3 mb-4" />
                <hr />
                <div className="flex justify-between items-center mt-3">
                  <Skeleton className="h-2 w-24" />
                  <Skeleton className="h-2 w-12" />
                </div>
                <Skeleton className="h-1 w-full rounded-full mt-4 mb-4" />
                <Skeleton className="h-14 w-72 max-w-full rounded-full mx-auto my-3" />
                <Skeleton className="h-2 w-40 mx-auto" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </TabWrapper>
  );
}

export function VoucherListSkeleton() {
  return (
    <TabWrapper>
      {["bg-[#E0DDD4]", "bg-[#131010]", "bg-[#E0DDD4]"].map((bg, i) => (
        <div
          key={i}
          className={`${bg} w-full max-w-md rounded-lg p-6 flex flex-col justify-between space-y-4 shadow-md mb-4`}
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <Skeleton
                tone={bg === "bg-[#131010]" ? "dark" : "light"}
                className="h-4 w-24"
              />
              <Skeleton
                tone={bg === "bg-[#131010]" ? "dark" : "light"}
                className="h-4 w-36"
              />
            </div>
            <Skeleton
              tone={bg === "bg-[#131010]" ? "dark" : "light"}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div className="flex justify-end">
            <Skeleton
              tone={bg === "bg-[#131010]" ? "dark" : "light"}
              className="h-3 w-32"
            />
          </div>
        </div>
      ))}
    </TabWrapper>
  );
}

export function RewardListSkeleton() {
  return (
    <TabWrapper>
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          className="bg-white w-full rounded-lg border border-gray-300 flex flex-col mb-4 overflow-hidden"
        >
          <Skeleton className="w-full aspect-[4/3] rounded-none" />
          <div className="flex justify-between items-center w-full p-4">
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </TabWrapper>
  );
}

export function PointHistorySkeleton() {
  return (
    <TabWrapper>
      <div className="flex flex-col items-center p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 w-full rounded-lg border border-gray-300 flex items-center justify-between mb-4"
          >
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-2 w-32" />
              </div>
              <Skeleton className="h-2 w-20" />
            </div>
            <div className="w-px h-16 bg-gray-300" />
            <div className="flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-16" />
              <span className="text-[8px] fontMon tracking-widest skeleton-text">
                POIN
              </span>
            </div>
          </div>
        ))}
      </div>
    </TabWrapper>
  );
}

export function PointExpiredSkeleton() {
  return (
    <TabWrapper>
      <div className="flex flex-col items-center p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="bg-white p-4 w-full rounded-lg border border-gray-300 flex items-center justify-between mb-4"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-14" />
              <span className="text-[8px] uppercase tracking-widest fontMon skeleton-text">
                Poin
              </span>
            </div>
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </div>
    </TabWrapper>
  );
}
