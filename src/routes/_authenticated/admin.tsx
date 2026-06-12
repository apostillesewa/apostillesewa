import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  Loader2, LogOut, FileText, Inbox, Mail, Plus, Pencil, Trash2, ExternalLink, Eye, ShieldCheck,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getMyRoles } from "@/lib/auth.functions";
import {
  listAllPostsAdmin, getPostAdmin, upsertPost, deletePost,
} from "@/lib/github-blog.functions";
import { listInquiries, updateInquiryStatus } from "@/lib/inquiries.functions";
import { listSubscribers } from "@/lib/newsletter.functions";
import { LogoMark } from "@/components/site/Logo";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Apostille Sewa" }, { name: "robots", content: "noindex,nofollow" }] }),
  component: AdminDashboard,
});

type Tab = "posts" | "inquiries" | "newsletter";

function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("posts");
  const fetchRoles = useServerFn(getMyRoles);
  const { data: rolesInfo, isLoading: rolesLoading } = useQuery({
    queryKey: ["my-roles"],
    queryFn: () => fetchRoles(),
  });

  const isAdmin = rolesInfo?.roles?.includes("admin") ?? false;
  const isEditor = isAdmin || (rolesInfo?.roles?.includes("editor") ?? false);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (rolesLoading) {
    return <CenterLoader />;
  }

  if (!isEditor) {
    return <NoAccess userId={rolesInfo?.userId} onSignOut={signOut} />;
  }

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <LogoMark className="h-8 w-8" />
            <span className="text-sm font-extrabold tracking-tight">
              Apostille<span className="font-normal text-primary"> Sewa</span>
              <span className="ml-2 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                Admin
              </span>
            </span>
          </Link>
          <button onClick={signOut} className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold text-foreground hover:bg-muted">
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-2 sm:px-4">
          <TabButton active={tab === "posts"} onClick={() => setTab("posts")} icon={FileText} label="Blog posts" />
          {isAdmin && <TabButton active={tab === "inquiries"} onClick={() => setTab("inquiries")} icon={Inbox} label="Inquiries" />}
          {isAdmin && <TabButton active={tab === "newsletter"} onClick={() => setTab("newsletter")} icon={Mail} label="Newsletter" />}
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {tab === "posts" && <PostsPanel />}
        {tab === "inquiries" && isAdmin && <InquiriesPanel />}
        {tab === "newsletter" && isAdmin && <NewsletterPanel />}
      </main>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof FileText; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center gap-1.5 whitespace-nowrap px-3 py-3 text-xs font-semibold transition-colors ${
        active ? "text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-3.5 w-3.5" /> {label}
      {active && <span className="absolute inset-x-2 -bottom-px h-0.5 bg-primary" />}
    </button>
  );
}

function CenterLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
}

function NoAccess({ userId, onSignOut }: { userId?: string; onSignOut: () => void }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--surface)] px-4">
      <div className="max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-card">
        <ShieldCheck className="mx-auto h-8 w-8 text-muted-foreground" />
        <h1 className="mt-3 text-xl font-bold text-foreground">No admin access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account is signed in but doesn't have the <code className="rounded bg-muted px-1">admin</code> or
          <code className="ml-1 rounded bg-muted px-1">editor</code> role yet.
        </p>
        {userId && (
          <p className="mt-3 break-all rounded-md bg-muted px-3 py-2 text-[11px] text-muted-foreground">
            Ask a system owner to grant a role to:<br /><strong>{userId}</strong>
          </p>
        )}
        <button onClick={onSignOut} className="mt-4 inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-semibold hover:bg-muted">
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </div>
    </div>
  );
}

// ============ POSTS ============
function PostsPanel() {
  const fetchPosts = useServerFn(listAllPostsAdmin);
  const removePost = useServerFn(deletePost);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-posts"], queryFn: () => fetchPosts() });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const del = useMutation({
    mutationFn: (id: string) => removePost({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-posts"] }),
  });

  if (editingId || creating) {
    return (
      <PostEditor
        postId={editingId}
        onDone={() => {
          setEditingId(null);
          setCreating(false);
          qc.invalidateQueries({ queryKey: ["admin-posts"] });
        }}
        onCancel={() => {
          setEditingId(null);
          setCreating(false);
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">Blog posts</h2>
          <p className="text-xs text-muted-foreground">{data?.length ?? 0} posts in the library</p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-elegant hover:-translate-y-0.5"
        >
          <Plus className="h-3.5 w-3.5" /> New post
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
        {isLoading ? (
          <div className="flex items-center justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
        ) : !data?.length ? (
          <div className="px-6 py-10 text-center text-sm text-muted-foreground">No posts yet. Create your first one.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-[var(--surface)] text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5">Title</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="hidden px-4 py-2.5 md:table-cell">Category</th>
                <th className="hidden px-4 py-2.5 md:table-cell">Updated</th>
                <th className="px-4 py-2.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">
                    <div>{p.title}</div>
                    <div className="text-[11px] text-muted-foreground">/{p.slug}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      p.status === "published" ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"
                    }`}>{p.status}</span>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{p.category ?? "—"}</td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{p.updated_at ? new Date(p.updated_at).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="inline-flex items-center gap-1">
                      {p.status === "published" && (
                        <a href={`/blog/${p.slug}`} target="_blank" rel="noreferrer" className="rounded-md p-1.5 text-muted-foreground hover:bg-muted" title="View">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <button onClick={() => setEditingId(p.id)} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted" title="Edit">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete "${p.title}"?`)) del.mutate(p.id);
                        }}
                        className="rounded-md p-1.5 text-destructive hover:bg-destructive/10"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

type PostForm = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image_url: string;
  body: string;
  category: string;
  tagsText: string;
  status: "draft" | "published";
};

const emptyPost: PostForm = {
  title: "", slug: "", excerpt: "", cover_image_url: "", body: "",
  category: "Embassy Updates", tagsText: "", status: "draft",
};

function PostEditor({ postId, onDone, onCancel }: { postId: string | null; onDone: () => void; onCancel: () => void }) {
  const fetchPost = useServerFn(getPostAdmin);
  const save = useServerFn(upsertPost);
  const [form, setForm] = useState<PostForm>(emptyPost);
  const [loading, setLoading] = useState(!!postId);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!postId) return;
    fetchPost({ data: { id: postId } }).then((p) => {
      if (p) {
        setForm({
          id: p.id,
          title: p.title,
          slug: p.slug,
          excerpt: p.excerpt ?? "",
          cover_image_url: p.cover_image_url ?? "",
          body: p.body ?? "",
          category: p.category ?? "",
          tagsText: (p.tags ?? []).join(", "),
          status: (p.status as "draft" | "published") ?? "draft",
        });
      }
      setLoading(false);
    });
  }, [postId, fetchPost]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const tags = form.tagsText.split(",").map((t) => t.trim()).filter(Boolean);
      await save({
        data: {
          id: form.id,
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt || null,
          cover_image_url: form.cover_image_url || null,
          body: form.body,
          category: form.category || null,
          tags,
          status: form.status,
        },
      });
      onDone();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>;

  return (
    <form onSubmit={submit} className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-foreground">{postId ? "Edit post" : "New post"}</h2>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="rounded-lg border border-border px-3 py-2 text-xs font-semibold hover:bg-muted">
            Cancel
          </button>
          <button disabled={busy} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground shadow-elegant hover:-translate-y-0.5 disabled:opacity-60">
            {busy && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            Save {form.status === "published" ? "& publish" : "draft"}
          </button>
        </div>
      </div>

      {err && <p className="rounded-md bg-destructive/10 px-3 py-2 text-xs text-destructive">{err}</p>}

      <div className="grid gap-5 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4 rounded-xl border border-border bg-card p-5">
          <Field label="Title">
            <input required value={form.title} maxLength={200}
              onChange={(e) => setForm({ ...form, title: e.target.value, slug: form.slug || slugify(e.target.value) })}
              className={inputCls} />
          </Field>
          <Field label="Slug (URL)" hint="lowercase, dashes only">
            <input required value={form.slug} maxLength={160} pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
              onChange={(e) => setForm({ ...form, slug: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Excerpt">
            <textarea value={form.excerpt} maxLength={400} rows={2}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className={inputCls} />
          </Field>
          <Field label="Body (Markdown supported)">
            <textarea value={form.body} maxLength={60000} rows={18}
              onChange={(e) => setForm({ ...form, body: e.target.value })}
              className={`${inputCls} font-mono text-xs leading-relaxed`} />
          </Field>
        </div>
        <div className="space-y-4">
          <div className="space-y-3 rounded-xl border border-border bg-card p-5">
            <Field label="Status">
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "draft" | "published" })} className={inputCls}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
            <Field label="Category">
              <input value={form.category} maxLength={80}
                onChange={(e) => setForm({ ...form, category: e.target.value })} className={inputCls}
                placeholder="Embassy Updates" />
            </Field>
            <Field label="Tags" hint="comma-separated">
              <input value={form.tagsText} onChange={(e) => setForm({ ...form, tagsText: e.target.value })}
                className={inputCls} placeholder="poland, mofa, apostille" />
            </Field>
            <Field label="Cover image URL">
              <input type="url" value={form.cover_image_url} maxLength={500}
                onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} className={inputCls} />
            </Field>
          </div>
          {form.cover_image_url && (
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <img src={form.cover_image_url} alt="Cover preview" loading="lazy" className="aspect-video w-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

const inputCls = "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground">{label}</span>
        {hint && <span className="text-[10px] text-muted-foreground">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 160);
}

// ============ INQUIRIES ============
function InquiriesPanel() {
  const fetchAll = useServerFn(listInquiries);
  const setStatus = useServerFn(updateInquiryStatus);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-inquiries"], queryFn: () => fetchAll() });
  const mut = useMutation({
    mutationFn: (v: { id: string; status: "new" | "in_progress" | "closed" }) => setStatus({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-inquiries"] }),
  });

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">Inquiries</h2>
      <p className="text-xs text-muted-foreground">{data?.length ?? 0} submissions</p>
      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
        {isLoading ? <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
          : !data?.length ? <div className="px-6 py-10 text-center text-sm text-muted-foreground">No inquiries yet.</div>
          : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-[var(--surface)] text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5">Name</th>
                <th className="hidden px-4 py-2.5 md:table-cell">Contact</th>
                <th className="hidden px-4 py-2.5 md:table-cell">Source</th>
                <th className="px-4 py-2.5">Status</th>
                <th className="hidden px-4 py-2.5 md:table-cell">Received</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i) => (
                <tr key={i.id} className="border-b border-border align-top last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{i.name}</div>
                    {i.country && <div className="text-[11px] text-muted-foreground">{i.country}</div>}
                    {i.message && <div className="mt-1 max-w-xs text-xs text-muted-foreground line-clamp-2">{i.message}</div>}
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground md:table-cell">
                    {i.email && <div><a className="hover:text-foreground" href={`mailto:${i.email}`}>{i.email}</a></div>}
                    {i.phone && <div><a className="hover:text-foreground" href={`tel:${i.phone}`}>{i.phone}</a></div>}
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground md:table-cell">{i.source}</td>
                  <td className="px-4 py-3">
                    <select value={i.status} onChange={(e) => mut.mutate({ id: i.id, status: e.target.value as "new" | "in_progress" | "closed" })}
                      className="rounded-md border border-input bg-background px-2 py-1 text-xs">
                      <option value="new">New</option>
                      <option value="in_progress">In progress</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>
                  <td className="hidden px-4 py-3 text-xs text-muted-foreground md:table-cell">{new Date(i.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ============ NEWSLETTER ============
function NewsletterPanel() {
  const fetchAll = useServerFn(listSubscribers);
  const { data, isLoading } = useQuery({ queryKey: ["admin-subscribers"], queryFn: () => fetchAll() });
  const csv = `email,subscribed_at\n${(data ?? []).map((s) => `${s.email},${s.created_at}`).join("\n")}`;
  const csvUrl = typeof window !== "undefined"
    ? URL.createObjectURL(new Blob([csv], { type: "text/csv" }))
    : "#";

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">Newsletter subscribers</h2>
          <p className="text-xs text-muted-foreground">{data?.length ?? 0} contacts</p>
        </div>
        {!!data?.length && (
          <a href={csvUrl} download="subscribers.csv"
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-semibold hover:bg-muted">
            <Eye className="h-3.5 w-3.5" /> Export CSV
          </a>
        )}
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-card">
        {isLoading ? <div className="flex justify-center py-10"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
          : !data?.length ? <div className="px-6 py-10 text-center text-sm text-muted-foreground">No subscribers yet.</div>
          : (
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-[var(--surface)] text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-2.5">Email</th>
                <th className="px-4 py-2.5">Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {data.map((s) => (
                <tr key={s.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">{s.email}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{new Date(s.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
