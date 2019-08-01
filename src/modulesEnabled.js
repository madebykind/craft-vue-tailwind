// import { myModule } from "@/components/path/to/module/index";

// This wouls normally be a named export in a file as per commented path above,
// here just to demo the pattern
const fakeModule = (configs) => configs.map((c) => console.log(c.message));

export default {
  // myModule,
  fakeModule,
};
