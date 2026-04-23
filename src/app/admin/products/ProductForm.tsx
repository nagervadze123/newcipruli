"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Category, Product } from "@/lib/types";
import { createProduct, updateProduct } from "@/app/admin/actions";

export function ProductForm({
  categories,
  mode,
  product,
}: {
  categories: Category[];
  mode: "create" | "edit";
  product?: Product;
}) {
  const [type, setType] = useState<"prompt" | "file">(product?.type ?? "prompt");
  const [isFree, setIsFree] = useState<boolean>(product?.is_free ?? true);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  return (
    <form
      action={(fd) => {
        setError(null);
        startTransition(async () => {
          const res =
            mode === "create"
              ? await createProduct(fd)
              : await updateProduct(product!.id, fd);
          if (res?.error) setError(res.error);
          else router.push("/admin");
        });
      }}
      className="space-y-6"
    >
      <Field label="სათაური (ქართულად)">
        <input
          name="title_ka"
          required
          defaultValue={product?.title_ka ?? ""}
          maxLength={140}
          className="input"
          placeholder="მაგ.: AI პრომპტები მწერლებისთვის"
        />
      </Field>

      <Field label="მოკლე აღწერა">
        <textarea
          name="description_ka"
          defaultValue={product?.description_ka ?? ""}
          rows={3}
          maxLength={500}
          className="input"
          placeholder="1-2 წინადადებით აღწერე რა არის და ვისთვის."
        />
      </Field>

      <div className="grid md:grid-cols-2 gap-4">
        <Field label="კატეგორია">
          <select
            name="category_id"
            defaultValue={product?.category_id ?? ""}
            className="input"
          >
            <option value="">— არცერთი —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name_ka}
              </option>
            ))}
          </select>
        </Field>

        <Field label="ტიპი">
          <div className="flex gap-2">
            <Chip active={type === "prompt"} onClick={() => setType("prompt")}>პრომპტი (ტექსტი)</Chip>
            <Chip active={type === "file"} onClick={() => setType("file")}>ფაილი / ცნობა</Chip>
          </div>
          <input type="hidden" name="type" value={type} />
        </Field>
      </div>

      <Field label="ავტორი (ნებაყოფლობით)">
        <input
          name="author_name"
          defaultValue={product?.author_name ?? ""}
          maxLength={80}
          className="input"
          placeholder="მაგ.: Cipruli Studio"
        />
      </Field>

      <Field label="ფასი">
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              name="is_free"
              className="accent-[var(--cyan)]"
            />
            უფასო
          </label>
          <input
            name="price_gel"
            type="number"
            step="0.01"
            min="0"
            defaultValue={product?.price_gel ?? ""}
            disabled={isFree}
            placeholder="₾"
            className="input max-w-[160px] disabled:opacity-40"
          />
        </div>
      </Field>

      {type === "prompt" ? (
        <Field label="პრომპტის ტექსტი">
          <textarea
            name="content_text"
            defaultValue={product?.content_text ?? ""}
            rows={10}
            required
            className="input font-mono text-sm"
            placeholder="დაწერე ან ჩააწებე პრომპტი აქ…"
          />
        </Field>
      ) : (
        <Field label="ფაილის შესახებ">
          <textarea
            name="content_text"
            defaultValue={product?.content_text ?? ""}
            rows={5}
            className="input"
            placeholder="აღწერა ან გარე ბმული (Google Drive, GitHub, Notion)."
          />
          <div className="mt-2 text-xs text-[var(--fg-dim)]">
            ფაილის ატვირთვა დაემატება შემდეგ განახლებაში (Supabase Storage).
          </div>
        </Field>
      )}

      {error && (
        <div className="rounded-2xl border border-[var(--rose)]/30 bg-[var(--rose)]/10 p-4 text-sm text-[var(--rose)]">
          {error}
        </div>
      )}

      <div className="flex justify-end">
        <button type="submit" disabled={pending} className="btn btn-primary disabled:opacity-60">
          {pending ? "ინახება…" : mode === "create" ? "გამოქვეყნება" : "შენახვა"}
        </button>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 14px;
          padding: 12px 14px;
          color: var(--fg);
          outline: none;
          transition: border-color 180ms ease, background 180ms ease;
        }
        .input:focus { border-color: rgba(255,255,255,0.30); background: rgba(255,255,255,0.06); }
        .input::placeholder { color: var(--fg-dim); }
      `}</style>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-2 text-sm text-[var(--fg-muted)]">{label}</div>
      {children}
    </label>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-2 text-sm transition border ${
        active
          ? "bg-white text-black border-white"
          : "border-white/10 text-[var(--fg-muted)] hover:text-white hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}
