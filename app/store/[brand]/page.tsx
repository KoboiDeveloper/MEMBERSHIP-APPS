"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import { useAppDispatch } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getStore } from "@/redux/thunks/storeThunks";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import generateSlug from "@/utils/generateSlug";
import PageError from "@/components/PageError";
import { StoreBrandSkeleton } from "@/components/PageSkeletons";

type Store = {
  brand: string;
  storeID: string;
  kota: string;
  storeAddress: string;
  noTelpon: string;
  mapStoreUrl: string; //iframe map
  mapLink: string;
};

export default function Store() {
  const params = useParams();

  const dispatch = useAppDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [detail, setDetail] = useState<Store | null>(null);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState<Store[]>([]);

  const { error, data } = useSelector((state: RootState) => state.store);

  // fungsi untuk membuat slug untuk brand
  useEffect(() => {
    dispatch(getStore());
  }, [dispatch]);

  useEffect(() => {
    if (data?.storeLocationData.length > 0) {
      setFilteredData(
        data.storeLocationData.filter(
          (item: Store) => generateSlug(item.brand) === params.brand,
        ),
      );
    }
  }, [data?.storeLocationData]);

  const showModal = ({ storeID }: { storeID: string }) => {
    data.storeLocationData?.find((item: Store) => {
      if (item.storeID === storeID) {
        setIsModalVisible(true);
        setDetail(item);
        return true;
      }
    });
  };

  const closeModal = () => setIsModalVisible(false);

  // untuk modal dan fungsi search
  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);
  const showSearchModal = () => setIsSearchModalVisible(true);
  const closeSearchModal = () => setIsSearchModalVisible(false);

  // const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   setFilteredData(
  //     // Filter data berdasarkan pencarian
  //     data.storeLocationData.filter((location: Store) => {
  //       const searchLower = search.toLowerCase();
  //       const combinedString =
  //         `${location.brand} ${location.kota}`.toLowerCase(); // Gabungkan brand dan kota
  //       return combinedString.includes(searchLower); // Cek apakah pencarian cocok
  //     })
  //   );
  //   setIsSearchModalVisible(false);
  //   setSearch("");
  // };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const selectedBrand = params.brand; // Mendapatkan brand dari params

    // Filter data berdasarkan pencarian dan brand yang dipilih
    const filtered = data.storeLocationData.filter((location: Store) => {
      const searchLower = search.toLowerCase();
      const combinedString = `${location.brand} ${location.kota}`.toLowerCase(); // Gabungkan brand dan kota
      const matchesSearch = combinedString.includes(searchLower); // Cek apakah pencarian cocok
      const matchesBrand = generateSlug(location.brand) === selectedBrand; // Cek apakah brand cocok dengan yang dipilih

      return matchesSearch && matchesBrand; // Pastikan kedua kondisi terpenuhi
    });

    setFilteredData(filtered);
    setIsSearchModalVisible(false);
    setSearch("");
  };

  // Fungsi untuk mendekode HTML entities
  const decodeHTMLEntities = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  if (data == null) {
    return <StoreBrandSkeleton />;
  }

  if (error) {
    return <PageError />;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center w-full max-w-md bg-white md:rounded-lg min-h-screen">
        <div className="bg-base-accent w-full min-h-screen">
          <Header>
            <div className="flex items-center justify-between mt-4">
              <span className="text-[10px] tracking-widest fontMon">
                LOKASI TOKO
              </span>
              <div className="flex items-center justify-center gap-2 cursor-pointer">
                <Image
                  src="/images/search.svg"
                  alt="Cari"
                  width={24}
                  height={24}
                  className="w-6 h-6 cursor-pointer"
                  onClick={showSearchModal}
                />
              </div>
            </div>
          </Header>

          {/* search open */}
          {isSearchModalVisible && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
              onClick={closeSearchModal}
            >
              <div
                className="bg-white w-full max-w-md shadow-lg rounded-b-2xl p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center gap-4">
                  <span className="text-xs">
                    Masukkan brand atau kota yang anda cari
                  </span>
                  <button
                    onClick={closeSearchModal}
                    className="text-black shrink-0"
                    aria-label="Tutup"
                  >
                    &#10005;
                  </button>
                </div>
                <form onSubmit={handleSearch}>
                  <div className="flex items-center mt-3 border border-gray-300 rounded-lg overflow-hidden">
                    <input
                      type="text"
                      name="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Cari brand atau kota"
                      className="flex-1 min-w-0 px-3 py-2 outline-none text-base"
                    />
                    <button
                      type="submit"
                      className="px-3 shrink-0"
                      aria-label="Cari"
                    >
                      <Image
                        src="/images/search.svg"
                        alt="Cari"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="flex flex-col items-center justify-center p-4">
            {(filteredData && filteredData.length > 0
              ? filteredData
              : data.storeLocationData
            ).map((location: Store) => (
              <div
                key={location.storeID}
                className="bg-white px-4 py-6 w-full rounded-lg border border-gray-300 flex items-center justify-between cursor-pointer mb-4"
                onClick={() => showModal({ storeID: location.storeID })}
              >
                <span className="text-sm">
                  {location?.brand &&
                    location.brand.charAt(0).toUpperCase() +
                      location.brand.slice(1).toLowerCase()}{" "}
                  {location?.kota &&
                    location.kota.charAt(0).toUpperCase() +
                      location.kota.slice(1).toLowerCase()}
                </span>
                <Image
                  src="/images/location.svg"
                  alt="location"
                  width={100}
                  height={100}
                  className="w-auto h-auto cursor-pointer"
                />
              </div>
            ))}
          </div>

          {/* modal detail location */}
          {isModalVisible && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white w-full h-dvh max-w-md shadow-lg overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white flex justify-between items-center p-6">
                  <span className="text-[10px] tracking-widest fontMon">
                    LOKASI TOKO
                  </span>
                  <button onClick={closeModal} className="text-black">
                    &#10005;
                  </button>
                </div>

                {/* Content */}
                <div className="flex flex-col items-center justify-center px-4 pt-2 pb-10">
                  <h2 className="text-base text-center">
                    {detail?.brand &&
                      detail.brand.charAt(0).toUpperCase() +
                        detail.brand.slice(1).toLowerCase()}{" "}
                    {detail?.kota &&
                      detail.kota.charAt(0).toUpperCase() +
                        detail.kota.slice(1).toLowerCase()}
                  </h2>

                  <div
                    className="w-full my-4 overflow-hidden rounded-lg [&_iframe]:!block [&_iframe]:!h-auto [&_iframe]:!aspect-[4/3] [&_iframe]:!w-full [&_iframe]:!max-w-full"
                    dangerouslySetInnerHTML={{
                      __html:
                        detail && detail.mapStoreUrl
                          ? decodeHTMLEntities(detail.mapStoreUrl)
                          : "",
                    }}
                  ></div>

                  <div className="flex flex-col items-center justify-center mb-4">
                    <span className="text-sm">Alamat</span>
                    <p className="text-[10px] fontMon text-center my-2 break-words max-w-full">
                      {detail?.storeAddress}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center mb-6">
                    <span className="text-sm mb-2">Jam Toko</span>
                    <p className="text-[10px] fontMon">Senin - Sabtu</p>
                    <p className="text-[10px] fontMon">10.00 - 22.00</p>
                  </div>

                  <Button
                    label="BUKA MAP"
                    onClick={() => window.open(detail?.mapLink, "_blank")}
                    className="bg-base-accent text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
