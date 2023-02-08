import { TypeRegistry, Metadata } from "@polkadot/types";
import metadataHex from "./metadata.json";
import path from "path";
import fs from "fs";

const typeRegistry = new TypeRegistry();
const metadata = new Metadata(typeRegistry, metadataHex as `0x${string}`);

typeRegistry.setMetadata(metadata);

export { typeRegistry };

export * from "./balances";
export * from "./nft";
