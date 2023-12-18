import { Container } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

import { CardList } from "./clientComponents/card/CardList";
import { EditBookDialog } from "./clientComponents/dialog/EditBookDialog";
import { Header } from "./clientComponents/header/Header";
import { Toaster } from "./clientComponents/toaster/Toaster";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between">
      <Container className="w-full h-auto py-8 px-4" size="1">
        <Header />
        <div className="mt-8 flex flex-col space-y-4 items-center">
          <CardList />
        </div>
        <EditBookDialog />
        <Toaster />
      </Container>
    </main>
  );
}
