import Link from "next/link";
import Image from "next/image";
import Button from "@/components/Button";
import ProgressBarMileStone from "@/components/PrgressBarMileStone";
import React, { useEffect, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { useSelector } from "react-redux";
import { getMission } from "@/redux/thunks/missionThunks";
import { RootState } from "@/redux/store";
import formatToIDR from "@/utils/formatToIDR";
import { FadeLoader } from "react-spinners";
import axios from "axios";
import SuccessMessage from "@/components/SuccessMessage";
import { useRouter } from "next/navigation";
import { formatDate, parseIndoDate } from "@/utils/formatMission";
import getMissionStock from "@/utils/getMissionStock";
import type { Mission, Milestone } from "@/types/mission";

export default function Mission({
  setSuccessMessageJoin,
}: {
  setSuccessMessageJoin: (value: boolean) => void;
}) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error, data } = useSelector((state: RootState) => state.mission);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [successMessageClaim, setSuccessMessageClaim] = useState(false);
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const [claimedMilestones, setClaimedMilestones] = useState<number[]>([]);

  useEffect(() => {
    const member = localStorage.getItem("member");
    const token = localStorage.getItem("token");
    if (!member || !token) {
      router.replace("/"); // Redirect ke halaman login
    } else if (!data || data.missionsData.length === 0) {
      dispatch(getMission());
    }
  }, [dispatch, router, data]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isModalOpen]);

  const handleOpenModal = (mission: Mission | null) => {
    setSelectedMission(mission);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMission(null);
  };

  // handle join mission
  const handleJoinMission = async (missionId: number) => {
    setLoadingId(missionId); // set mission yang sedang loading
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }mission/join?memberID=${localStorage.getItem(
          "member",
        )}&missionID=${missionId}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.responseCode === "2002500") {
        setSuccessMessageJoin(true);
        setTimeout(() => setSuccessMessageJoin(false), 3000);
        setIsModalOpen(false);
        dispatch(getMission());
      } else {
        console.error("Failed to join mission:", response.data);
      }
    } catch (error) {
      console.error("Error joining mission:", error);
    } finally {
      setLoadingId(null); // reset loadingId setelah request selesai
    }
  };

  // Handle milestone claim
  const handleClaimMilestone = async (milestone: Milestone) => {
    setIsLoading(milestone.idMil);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.post(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }mission/milestone/claim?memberID=${localStorage.getItem(
          "member",
        )}&missionID=${selectedMission?.id}&milestoneID=${milestone.idMil}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.responseCode === "2002500") {
        setClaimedMilestones((prev) => [...prev, milestone.idMil]);
        setSuccessMessageClaim(true);
        setTimeout(() => setSuccessMessageClaim(false), 3000);
      } else {
        console.error("Failed to claim milestone:", response.data);
        alert("Gagal klaim milestone, silakan coba lagi."); // beri feedback ke user
      }
    } catch (error) {
      console.error("Error claiming milestone:", error);
      alert("Terjadi kesalahan saat klaim milestone."); // beri feedback ke user
    } finally {
      setIsLoading(null); // reset loading supaya tombol bisa diklik lagi
    }
  };

  const canClaimByStock = (sisaClaim: string | number | null) => {
    if (sisaClaim === "-") return true;
    const stock = Number(sisaClaim);
    return Number.isFinite(stock) && stock > 0;
  };

  if (!data) {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-screen">
        <Image src="/images/logo.svg" width={150} height={150} alt="logo" />
        <FadeLoader color="#101E2B" width={5} />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const endDate = parseIndoDate(selectedMission?.endDate || "");
  const claimDeadline = new Date(endDate);
  claimDeadline.setMonth(claimDeadline.getMonth() + 1);
  return (
    <div className="pb-8">
      {(() => {
        const activeMissions =
          data?.missionsData?.filter((mission) => {
            const endDate = parseIndoDate(mission.endDate);
            endDate.setHours(23, 59, 59, 999); // biar full 1 hari
            return endDate >= new Date(); // yg masih aktif
          }) || [];

        if (activeMissions.length === 0) {
          return (
            <div className="px-4 pt-4 text-center text-gray-500">
              Tidak ada misi aktif.
            </div>
          );
        }

        return activeMissions.map((mission) => {
          const stock = getMissionStock(mission.milestonesDetail);
          return (
            <div key={mission.id} className="px-4 pt-4">
              <div className="bg-white w-full rounded-lg flex flex-col justify-between shadow-lg overflow-auto">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col w-full">
                    <Image
                      src={`https://web.amscorp.id:3060/imagestorage/mission/${mission.imageUrl}`}
                      alt="mission"
                      width={600}
                      height={400}
                      className="w-full max-h-52 object-cover bg-slate-400"
                    />
                    <div className="p-4">
                      <div className="flex flex-col">
                        <div className="mb-4">
                          <span className="text-[10px] fontMon mb-4 text-amber-800 tracking-wider rounded-md bg-amber-50 p-2 border border-amber-200">
                            {mission.brand.toUpperCase()}
                          </span>
                        </div>

                        <span className="text-lg mb-1">{mission.title}</span>
                        <span className="text-xs fontMon text-gray-600 mb-3">
                          {mission.description}
                        </span>

                        <span
                          className="text-[10px] underline cursor-pointer opacity-50"
                          onClick={() => handleOpenModal(mission)}
                        >
                          Cek Detail
                        </span>

                        <div className="mt-4">
                          <hr />
                        </div>

                        <div className="flex justify-between items-center mt-2">
                          <div className="text-[9px] fontMon opacity-50 tracking-wider">
                            Progress: {mission.progressText}
                          </div>

                          {stock.type === "number" && (
                            <span className="text-[10px] opacity-50">
                              Stok: {stock.value}
                            </span>
                          )}

                          {stock.type === "infinity" && (
                            <span className="text-[10px] opacity-50 flex items-center gap-1">
                              Stok: &#8734;
                            </span>
                          )}
                        </div>

                        <div className="flex justify-between items-center mt-1">
                          <ProgressBarMileStone
                            currentValue={mission.currentValue}
                            maxValue={mission.maxValue}
                            milestones={mission.milestones}
                            milestonesDetail={mission.milestonesDetail}
                          />
                        </div>

                        {mission.statusMission === "" && (
                          <div className="flex justify-center py-5">
                            <Button
                              label={
                                loadingId === mission.id ? "Joining..." : "JOIN"
                              }
                              className="bg-base-accent text-white"
                              onClick={() => handleJoinMission(mission.id)}
                              disabled={loadingId === mission.id}
                            />
                          </div>
                        )}

                        <span className="text-[10px] fontMon text-center tracking-wider opacity-50">
                          {(() => {
                            const endDate = parseIndoDate(mission.endDate);
                            endDate.setHours(23, 59, 59, 999);

                            return endDate > new Date()
                              ? `Berakhir pada ${mission.endDate}`
                              : "Misi telah berakhir";
                          })()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        });
      })()}

      {/* Modal Detail */}
      {isModalOpen && selectedMission && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-end justify-center"
          onClick={handleCloseModal}
        >
          <div
            className="w-full max-w-md bg-white rounded-t-2xl p-6 shadow-xl animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {successMessageClaim && (
              <SuccessMessage message="Milestone claimed successfully." />
            )}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">{selectedMission.title}</h2>
              <button
                className="text-sm text-gray-500"
                onClick={handleCloseModal}
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {selectedMission.description}
            </p>
            <div className="space-y-3">
              <div
                className={
                  selectedMission.milestonesDetail.length > 3
                    ? "max-h-[46vh] overflow-y-auto pr-1" // 46% tinggi layar
                    : ""
                }
              >
                {selectedMission.milestonesDetail.map(
                  (milestone: Milestone) => (
                    <div
                      key={milestone.idMil}
                      className="border border-gray-200 p-3 rounded-lg bg-gray-50 fontMon flex justify-between items-center mb-2"
                    >
                      <div>
                        <h3 className="text-sm font-semibold">
                          {milestone.milDesc}
                        </h3>
                        <p className="text-xs">
                          Target: {formatToIDR(milestone.milValue)}{" "}
                          {selectedMission.category == "TOTAL_TRANSAKSI"
                            ? "Transaksi"
                            : ""}
                        </p>
                        <p className="text-xs">
                          Tercapai: {formatToIDR(milestone.milCurrentValue)}{" "}
                          {selectedMission.category == "TOTAL_TRANSAKSI"
                            ? "Transaksi"
                            : ""}
                        </p>
                        <p className="text-xs">
                          Status: {milestone.milClaimStatus}
                        </p>
                        <p className="text-xs">Reward: {milestone.milReward}</p>
                        {milestone.milPassDate && (
                          <>
                            {/* Tanggal selesai */}
                            <p className="text-[10px] text-green-600">
                              Selesai: {formatDate(milestone.milPassDate)}
                            </p>

                            {/* Tanggal klaim */}
                            {milestone.milClaimDate !== "" && (
                              <p className="text-red-600 text-[10px]">
                                Klaim:{" "}
                                {formatDate(milestone.milClaimDate || "")}
                              </p>
                            )}

                            {/* Status klaim */}
                            {milestone.milClaimDate === "" ? (
                              new Date() > claimDeadline ? (
                                <p className="text-[10px] text-red-600">
                                  Masa waktu klaim habis (batas{" "}
                                  {formatDate(claimDeadline)})
                                </p>
                              ) : (
                                <p className="text-[10px] text-red-600">
                                  Max klaim sampai {formatDate(claimDeadline)}
                                </p>
                              )
                            ) : null}

                            {/* stock claim */}
                            {milestone.sisaClaim !== null && (
                              <p className="text-[10px] flex items-center gap-1">
                                Stock:
                                {milestone.sisaClaim === "-" ? (
                                  <span className="flex items-center gap-1">
                                    <span className="text-base-accent font-bold">
                                      &#8734;
                                    </span>
                                  </span>
                                ) : (
                                  <span>{milestone.sisaClaim}</span>
                                )}
                              </p>
                            )}
                          </>
                        )}
                      </div>

                      {/* button klaim */}
                      {milestone.milClaimDate === "" &&
                      !claimedMilestones.includes(milestone.idMil) ? (
                        milestone.milClaimStatus === "complete" &&
                        canClaimByStock(milestone.sisaClaim) && (
                          <button
                            className="bg-base-accent text-white text-xs rounded-md py-1 px-4"
                            onClick={() => handleClaimMilestone(milestone)}
                            disabled={isLoading === milestone.idMil}
                          >
                            {isLoading === milestone.idMil
                              ? "Klaiming..."
                              : "Klaim"}
                          </button>
                        )
                      ) : (
                        <>
                          {milestone.RewardCategory === "Voucher" ? (
                            <Link
                              href="/voucher"
                              className="bg-base-accent text-white text-xs rounded-md py-1 px-4"
                            >
                              Lihat Voucher
                            </Link>
                          ) : (
                            <Link
                              href="https://tally.so/r/3lG9Lp"
                              target="_blank"
                              className="bg-base-accent text-white text-xs rounded-md py-1 px-4"
                            >
                              Input Alamat
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tambahkan animasi CSS untuk transisi */}
      <style jsx>{`
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0%);
          }
        }
      `}</style>
    </div>
  );
}
