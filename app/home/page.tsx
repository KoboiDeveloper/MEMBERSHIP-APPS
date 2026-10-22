"use client";

import Brand from "@/components/Brand";
import Carousel from "@/components/Carousel";
import ModalInputPin from "@/components/ModalInputPin";
import ModalQRCode from "@/components/ModalQrCode";
import ModalSurveyPopup from "@/components/ModalSurveyPopup";
import TabBar from "@/components/TabBar";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getUsers } from "@/redux/thunks/usersThunks";
import { getMission } from "@/redux/thunks/missionThunks";
import { parseIndoDate } from "@/utils/formatMission";
import type { Mission } from "@/types/mission";
import formatToIDR from "@/utils/formatToIDR";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Misi from "@/public/images/CRM-Mission.svg";
import Lucky from "@/public/images/CRM-Lucky draw.svg";
import Referral from "@/public/images/CRM-Referral.svg";
import Promo from "@/public/images/CRM-Promo.svg";
import { GoogleTagManager } from "@next/third-parties/google";
import toNormalCase from "@/utils/toNormalCase";
import PageError from "@/components/PageError";
import { HomeSkeleton } from "@/components/PageSkeletons";

export default function Page() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isShowQr, setIsShowQr] = useState(false);
  const [pin, setPin] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const { error, user } = useSelector((state: RootState) => state.users);
  const [year, setYear] = useState<string | null>(null);
  const missionData = useSelector((state: RootState) => state.mission.data);
  const [surveyQueue, setSurveyQueue] = useState<Mission[]>([]);
  const surveyPopup = surveyQueue[0] ?? null;

  // Memuat data user saat komponen dirender
  useEffect(() => {
    const member = localStorage.getItem("member");
    const token = localStorage.getItem("token");
    if (!member || !token) {
      router.replace("/"); // Redirect ke halaman login
    } else {
      dispatch(getUsers()); // Panggil thunk dengan token
      dispatch(getMission()); // untuk popup MISSION_SURVEY
    }
  }, [dispatch, router]);

  // Popup MISSION_SURVEY: tampil berurutan, sekali per mission untuk tiap member
  useEffect(() => {
    const member = localStorage.getItem("member");
    if (!member) return;

    const surveys = missionData?.missionsData?.filter((mission) => {
      // survei disembunyikan sementara; hapus `true ||` untuk menampilkan lagi
      if (true || mission.category !== "MISSION_SURVEY") return false;

      const endDate = parseIndoDate(mission.endDate);
      endDate.setHours(23, 59, 59, 999);
      if (endDate < new Date()) return false;

      const details = mission.milestonesDetail ?? [];
      const allClaimed =
        details.length > 0 && details.every((m) => !!m.milClaimDate);
      if (allClaimed) return false;

      return !localStorage.getItem(`survey_popup_${member}_${mission.id}`);
    });

    setSurveyQueue(surveys ?? []);
  }, [missionData]);

  useEffect(() => {
    const currentYear = user?.memberInfoData.joinDate.slice(0, 4);
    setYear(currentYear || "");
  }, [user]);

  if (user == null) {
    return <HomeSkeleton />;
  }

  if (error) {
    return <PageError />;
  }

  const handlePopUpQr = () => {
    // setIsModalVisible(true);
    setIsShowQr(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsShowQr(false);
  };

  const closeSurveyPopup = () => {
    const member = localStorage.getItem("member");
    if (member && surveyPopup) {
      localStorage.setItem(`survey_popup_${member}_${surveyPopup.id}`, "1");
    }
    setSurveyQueue((queue) => queue.slice(1)); // lanjut ke popup berikutnya
  };

  const goToMission = () => {
    const member = localStorage.getItem("member");
    if (member && surveyPopup) {
      localStorage.setItem(`survey_popup_${member}_${surveyPopup.id}`, "1");
    }
    router.push("/mission");
  };

  const handleCheckPin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin === user.memberInfoData.pin) {
      setIsModalVisible(false);
      setIsShowQr(true);
      setPin("");
    } else {
      setErrorMessage(true);
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
  };

  return (
    <>
      <GoogleTagManager gtmId="G-BCQ06P5FG5" />
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-full max-w-md bg-white md:rounded-lg min-h-screen">
          <div className="bg-base-accent w-full relative overflow-hidden mb-20">
            {/* <Image
            src={Background}
            width={480}
            height={200}
            alt="background"
            className="absolute p-2 -right-32"
          /> */}

            {user.memberInfoData.pos_transaction === true ? (
              <div className="bg-green-600 w-full text-center py-2 sticky">
                <p className="text-[10px] text-white fontMon">
                  Anda sedang melakukan transaksi di Kasir
                </p>
              </div>
            ) : user.memberInfoData.emailStatus === "email not verified" ? (
              <div className="bg-red-600 w-full text-center py-2 sticky">
                <p className="text-[10px] text-white fontMon">
                  Anda belum verifkasi email.{" "}
                  <Link
                    href="/validasi-email"
                    className="underline underline-offset-4"
                  >
                    Klik disini
                  </Link>
                </p>
              </div>
            ) : null}

            <div className="flex justify-between items-center px-8 pt-8 pb-5 relative">
              <span className="text-lg text-white normal-case tracking-wide">
                Hi, {toNormalCase(user.memberInfoData.fullName.split(" ")[0])}!
              </span>
              <Link href="/transaction" className="text-white">
                <div className="flex justify-center items-center gap-2">
                  <div className="flex flex-col items-end">
                    <span className="text-[7px] fontMon uppercase tracking-widest text-white">
                      Tier
                    </span>
                    <span className="text-sm text-white tracking-wide">
                      {user.memberInfoData.tierInfo.tier_name}
                    </span>
                  </div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_CARD_URL}${user.memberInfoData.tierInfo.profileImage}`}
                    width={50}
                    height={50}
                    alt={`${user.memberInfoData.tierInfo.profileImage}`}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
              </Link>
            </div>

            {/* promo carousel */}
            {/* <div className="px-8 flex flex-col items-end z-10 relative">
            <div className="w-full h-full rounded-lg">
              <Carousel />
            </div>
            <Link
              href={"/promo"}
              className="text-[8px] tracking-wider z-20 mt-2 fontMon"
            >
              LIHAT SEMUA
            </Link>
          </div> */}
            {/* promo carousel */}

            {/* Card tier */}
            <div className="flex justify-center items-center z-10 relative w-full mb-8 px-8">
              <div className="relative w-full">
                <Image
                  src={`${process.env.NEXT_PUBLIC_CARD_URL}${user.memberInfoData.tierInfo.cardImage}`}
                  alt={`${user.memberInfoData.tierInfo.cardImage}`}
                  width={500}
                  height={500}
                  className="w-full h-[210px] sm:h-[220px] md:h-[230px] lg:h-[230] rounded-xl"
                />
                <div
                  className="absolute inset-0 flex flex-row items-start justify-between z-10 p-4"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-white mb-1 normal-case">
                      {toNormalCase(user.memberInfoData.fullName)}
                    </span>
                    <span className="text-[7px] fontMon text-white tracking-widest">
                      MEMBER SEJAK {year}
                    </span>
                  </div>

                  {/* Poin */}
                  <div className="flex flex-col">
                    <span className="font-medium text-white text-right mb-1">
                      {formatToIDR(user.memberInfoData.points || 0)}
                    </span>
                    <span className="text-[7px] text-white tracking-widest text-right fontMon">
                      TOTAL POIN
                    </span>
                  </div>
                </div>
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center z-10"
                  style={{
                    textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                  }}
                >
                  <span className="text-sm fontMon uppercase tracking-widest text-white mb-1">
                    {user.memberInfoData.tierInfo.tier_name}
                  </span>
                  <span className="text-[8px] fontMon tracking-widest text-white">
                    TIER
                  </span>
                </div>
                <div className="absolute inset-0 flex items-end justify-between z-10 p-4">
                  <Link
                    href="/history-tier"
                    className="bg-white/50 flex p-2 rounded gap-1 cursor-pointer"
                  >
                    <Image
                      src="/images/graf-up.svg"
                      alt="Grafik"
                      width={10}
                      height={12}
                      className="logo shadow"
                    />
                    <span className="text-[8px] fontMon tracking-widest">
                      RIWAYAT TIER
                    </span>
                  </Link>
                  <div
                    className="bg-white/50 flex p-2 rounded gap-1 cursor-pointer"
                    onClick={handlePopUpQr}
                  >
                    <Image
                      src="/images/qr.svg"
                      alt="Barcode"
                      width={10}
                      height={12}
                      className="logo shadow"
                    />
                    <span className="text-[8px] fontMon tracking-widest">
                      TAMPILKAN ID
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Card tier */}

            <div className="flex flex-col bg-white pt-8 px-8 rounded-t-3xl relative">
              <div className="">
                {/* Menu Activation */}
                <div className="flex justify-between items-center gap-2 bg-white relative">
                  <div className="flex flex-col justify-center items-center gap-2 w-16">
                    <Link
                      href="/mission"
                      // href="/missionzz"
                      className="flex flex-col justify-center items-center gap-2 w-16 drop-shadow-[3px_3px_5px_rgba(0,0,0,0.10)]"
                    >
                      <Image
                        src={Misi}
                        width={50}
                        height={50}
                        alt="Misi"
                        className="w-auto h-full rounded-md bg-white"
                      />
                    </Link>

                    <span className="text-[10px]">Misi</span>
                  </div>
                  <Link
                    href="/lucky-draw"
                    className="flex flex-col justify-center items-center gap-2 w-16 drop-shadow-[3px_3px_5px_rgba(0,0,0,0.10)]"
                  >
                    <Image
                      src={Lucky}
                      width={50}
                      height={50}
                      alt="Undian"
                      className="w-auto h-full rounded-md bg-white"
                    />
                    <span className="text-[10px]">Undian</span>
                  </Link>
                  <div className="flex flex-col justify-center items-center gap-2 w-16 drop-shadow-[3px_3px_5px_rgba(0,0,0,0.10)]">
                    <Link
                      href="/comingsoon"
                      className="flex flex-col justify-center items-center gap-2 w-16"
                    >
                      <Image
                        src={Referral}
                        width={50}
                        height={50}
                        alt="Referral"
                        className="w-auto h-full rounded-md bg-white"
                      />
                    </Link>

                    <span className="text-[10px]">Referral</span>
                  </div>
                  <Link
                    href="/promo"
                    className="flex flex-col justify-center items-center gap-2 w-16 drop-shadow-[3px_3px_5px_rgba(0,0,0,0.10)]"
                  >
                    <Image
                      src={Promo}
                      width={50}
                      height={50}
                      alt="Promo"
                      className="w-auto h-full rounded-md bg-white"
                    />
                    <span className="text-[10px]">Promo</span>
                  </Link>
                </div>
                {/* Menu Activation */}
                {/* <div className="flex flex-col items-start">
                <span className="text-[8px] tracking-wider fontMon">
                  TOTAL POIN
                </span>
                <span className="font-medium">
                  Rp {formatToIDR(user.memberInfoData.points || 0)}
                </span>
              </div> */}
                {/* <div
                className="flex items-center justify-center border border-base-accent rounded-lg p-2 gap-2 cursor-pointer"
                onClick={handlePopUpQr}
              >
                <span className="text-[9px] tracking-wider">Tampilkan QR</span>
                <Image
                  src="/images/qr.svg"
                  width={50}
                  height={50}
                  alt="qr"
                  className="w-auto h-auto"
                />
              </div> */}
              </div>
            </div>

            {/* Modal for Input PIN */}
            {isModalVisible && (
              <ModalInputPin
                pin={pin}
                setPin={setPin}
                handleCheckPin={handleCheckPin}
                closeModal={closeModal}
                errorMessage={errorMessage}
                maxLength={6}
              />
            )}

            {/* Popup MISSION_SURVEY */}
            {surveyPopup && (
              <ModalSurveyPopup
                imageUrl={surveyPopup.imageUrl}
                brand={surveyPopup.brand}
                title={surveyPopup.title}
                description={surveyPopup.description}
                closeModal={closeSurveyPopup}
                onAction={goToMission}
              />
            )}

            {/* Modal for QR code */}
            {isShowQr && (
              <ModalQRCode data={user.memberInfoData} closeModal={closeModal} />
            )}

            <div className="flex flex-col p-8 gap-2 bg-white relative">
              {/* promo carousel */}
              <div className=" flex flex-col items-end relative">
                <div className="w-full h-full rounded-lg">
                  <Carousel />
                </div>
                <Link
                  href={"/promo"}
                  className="text-[8px] tracking-wider mt-2 fontMon"
                >
                  LIHAT SEMUA
                </Link>
              </div>
              {/* promo carousel */}
              <h2 className="text-lg mb-4">Brand Kami</h2>
              <Brand />
            </div>
          </div>
          <TabBar />
        </div>
      </div>
    </>
  );
}
