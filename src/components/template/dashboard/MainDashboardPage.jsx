
import Link from "next/link";

function MainDashboardPage({ userName, role }) {
  return (
    <main className="max-h-screen">
      <h1 className="text-center text-lg">
        <span className="font-bold">سلام {userName} عزیز؛ </span>
        به فروشگاه ویولا خوش آمدید💚
      </h1>
      {role === "ADMIN" ? (
        <p p className="mt-5 p-5 text-center leading-8">
          مدیر عزیز با استفاده از منوی سمت راست مدیریت و تنظیمات سایت خود را
          آغاز کنید.
        </p>
      ) : (
        <p className="mt-5 p-5 text-justify leading-8">
          در اینجا می‌توانید دنیای شگفت‌انگیز کتاب‌ها را کشف کنید.
          <br /> بی‌تردید یکی از کتاب‌های ما اشتیاق شما را برانگیخته و شما را به
          سفری فراموش‌نشدنی خواهد برد... همین حالا کتاب مورد علاقه‌تان را{" "}
          <Link href={"/"} className="font-bold text-darkColor underline">
            انتخاب کنید!
          </Link>
        </p>
      )}
    </main>
  );
}

export default MainDashboardPage;
