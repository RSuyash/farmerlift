
import { getAllCertifications } from "@/lib/cms";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, FileText, CheckCircle, Award, Download, Building2, FlaskConical, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export default async function CertificationsPage() {
    const certifications = await getAllCertifications();

    // Separate types for layout
    const licenses = certifications.filter(c => c.details.type === 'fco' || c.details.type === 'cib');
    const isoCerts = certifications.filter(c => c.details.type === 'iso');
    const labReports = certifications.filter(c => c.details.type === 'lab');
    const otherCerts = certifications.filter(c => c.details.type === 'other');

    return (
        <div className="min-h-screen bg-white dark:bg-black pb-20">
            {/* HERO SECTION */}
            <div className="relative bg-zinc-900 border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,_rgba(16,_185,_129,_0.2),_transparent_50%)]" />
                </div>
                <div className="container-width py-20 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                    <div className="max-w-2xl text-center md:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-6">
                            <ShieldCheck className="h-4 w-4" />
                            Official & Verified
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black font-outfit text-white mb-6 leading-tight">
                            Transparency in <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-600">
                                Every Grain & Drop
                            </span>
                        </h1>
                        <p className="text-xl text-zinc-400 leading-relaxed dark:text-zinc-300">
                            We don't just claim quality; we prove it. Explore our official licenses, ISO certifications, and NABL lab reports.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container-width py-16 space-y-24">

                {/* 1. GOVERNMENT RECOGNITIONS (Static Trust Elements) */}
                <section>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-zinc-100 dark:border-zinc-800 pb-4">
                        <div>
                            <h2 className="text-3xl font-bold font-outfit text-zinc-900 dark:text-white flex items-center gap-3">
                                <Building2 className="h-8 w-8 text-emerald-600" />
                                Government Recognitions
                            </h2>
                            <p className="text-zinc-500 dark:text-zinc-400 mt-2">Registered with key government bodies driving agricultural innovation.</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* MSME CARD */}
                        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0">
                                <ShieldCheck className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white">MSME Registered</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                    Recognized as a Micro, Small & Medium Enterprise by Govt of India.
                                </p>
                                <div className="mt-3 inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-bold rounded">Udyam Aadhar</div>
                            </div>
                        </div>

                        {/* STARTUP INDIA CARD */}
                        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0">
                                <Award className="h-6 w-6 text-orange-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white">Startup India</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                    Recognized Startup by DPIIT under the Startup India initiative.
                                </p>
                                <div className="mt-3 inline-block px-2 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold rounded">DPIIT Recognized</div>
                            </div>
                        </div>

                        {/* GST CARD */}
                        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-start gap-4">
                            <div className="h-12 w-12 rounded-lg bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 flex items-center justify-center shrink-0">
                                <FileText className="h-6 w-6 text-emerald-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-zinc-900 dark:text-white">GST Compliant</h3>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                                    Fully compliant with GST regulations for transparent billing.
                                </p>
                                <div className="mt-3 inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded">Verified Business</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. REGULATORY LICENSES (FCO / CIB) */}
                {(licenses.length > 0) && (
                    <section>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-3xl font-bold font-outfit text-zinc-900 dark:text-white flex items-center gap-3">
                                    <ShieldCheck className="h-8 w-8 text-blue-600" />
                                    Regulatory Licenses
                                </h2>
                                <p className="text-zinc-500 dark:text-zinc-400 mt-2">Valid licenses for Fertilizer and Pesticide distribution.</p>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-zinc-100 dark:bg-zinc-900/50">
                                        <tr>
                                            <th className="p-4 font-bold text-zinc-700 dark:text-zinc-300">License Type & Standard</th>
                                            <th className="p-4 font-bold text-zinc-700 dark:text-zinc-300">Registration No.</th>
                                            <th className="p-4 font-bold text-zinc-700 dark:text-zinc-300">Authority</th>
                                            <th className="p-4 font-bold text-zinc-700 dark:text-zinc-300">Valid Until</th>
                                            <th className="p-4 font-bold text-zinc-700 dark:text-zinc-300 text-right">Certificate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                                        {licenses.map(lic => (
                                            <tr key={lic.id} className="bg-white dark:bg-black hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors">
                                                <td className="p-4 text-zinc-900 dark:text-white">
                                                    <div className="font-bold">{lic.title}</div>
                                                    {lic.details.standard && (
                                                        <div className="text-xs text-blue-600 font-medium mt-1 inline-block bg-blue-50 px-2 py-0.5 rounded">
                                                            {lic.details.standard}
                                                        </div>
                                                    )}
                                                    {lic.details.scope && (
                                                        <p className="text-xs text-zinc-500 mt-1 max-w-xs">{lic.details.scope}</p>
                                                    )}
                                                </td>
                                                <td className="p-4 text-zinc-600 dark:text-zinc-400 font-mono text-xs">
                                                    {lic.details.certNumber}
                                                </td>
                                                <td className="p-4 text-zinc-600 dark:text-zinc-400">
                                                    {lic.details.authority}
                                                </td>
                                                <td className="p-4 text-zinc-600 dark:text-zinc-400">
                                                    {lic.details.validUntil || <span className="text-emerald-600 font-medium">Valid / Active</span>}
                                                </td>
                                                <td className="p-4 text-right">
                                                    {lic.details.fileUrl ? (
                                                        <a href={lic.details.fileUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:text-emerald-500 font-bold inline-flex items-center gap-1 text-xs uppercase tracking-wide border border-emerald-200 rounded-md px-3 py-1.5 hover:bg-emerald-50 transition-colors">
                                                            <FileText className="h-3 w-3" /> View Doc
                                                        </a>
                                                    ) : <span className="text-zinc-400">-</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                )}

                {/* 3. QUALITY CERTIFICATIONS (ISO, etc.) */}
                {(isoCerts.length > 0 || otherCerts.length > 0) && (
                    <section>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-3xl font-bold font-outfit text-zinc-900 dark:text-white flex items-center gap-3">
                                    <Award className="h-8 w-8 text-amber-500" />
                                    Standards & Quality
                                </h2>
                                <p className="text-zinc-500 dark:text-zinc-400 mt-2">ISO certifications and industry awards.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...isoCerts, ...otherCerts].map(cert => (
                                <div key={cert.id} className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-all">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="h-16 w-16 relative rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center p-2">
                                            <Image
                                                src={cert.image}
                                                alt={cert.title}
                                                fill
                                                className="object-contain p-1"
                                            />
                                        </div>
                                        {cert.details.standard && (
                                            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2 py-1 rounded-full border border-amber-200">
                                                {cert.details.standard}
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="font-bold text-xl text-zinc-900 dark:text-white mb-2">{cert.title}</h3>
                                    {cert.details.scope && (
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 line-clamp-2">
                                            {cert.details.scope}
                                        </p>
                                    )}
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                        <span className="text-xs text-zinc-400 font-mono">{cert.details.certNumber}</span>
                                        {cert.details.fileUrl && typeof cert.details.fileUrl === 'string' && (
                                            <a href={cert.details.fileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/btn">
                                                {/* Safe Thumbnail Check */}
                                                {cert.details.fileUrl.match(/\.(jpeg|jpg|png|webp|svg|gif)$/i) ? (
                                                    <div className="h-8 w-8 relative rounded overflow-hidden border border-zinc-200 bg-white">
                                                        <Image
                                                            src={cert.details.fileUrl}
                                                            alt="Cert"
                                                            fill
                                                            className="object-cover"
                                                            sizes="32px"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-8 w-8 rounded bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                                                        <FileText className="h-4 w-4" />
                                                    </div>
                                                )}
                                                <span className="text-sm font-bold text-emerald-600 group-hover/btn:text-emerald-500">
                                                    Verify
                                                </span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 4. LAB REPORTS */}
                {(labReports.length > 0) && (
                    <section>
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-3xl font-bold font-outfit text-zinc-900 dark:text-white flex items-center gap-3">
                                    <FlaskConical className="h-8 w-8 text-purple-600" />
                                    Lab Analysis Reports
                                </h2>
                                <p className="text-zinc-500 dark:text-zinc-400 mt-2">NABL accredited lab results for our batch productions.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {labReports.map(rep => (
                                <div key={rep.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-200 transition-colors gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 shrink-0">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-zinc-900 dark:text-white text-lg">{rep.title}</h4>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                <span className="text-xs text-zinc-500 bg-white dark:bg-black px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">Auth: {rep.details.authority}</span>
                                                {rep.details.standard && <span className="text-xs text-zinc-500 bg-white dark:bg-black px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700">Ref: {rep.details.standard}</span>}
                                            </div>
                                            {rep.details.relatedProduct && (
                                                <Link href={`/products/${rep.details.relatedProduct.slug}`} className="mt-2 text-xs font-bold text-purple-600 hover:underline flex items-center gap-1">
                                                    Verified for: {rep.details.relatedProduct.name} <CheckCircle className="h-3 w-3" />
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                    {rep.details.fileUrl && (
                                        <a href={rep.details.fileUrl} target="_blank" className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-purple-500/20">
                                            <Download className="h-4 w-4" /> Download
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* EMPTY STATE */}
                {certifications.length === 0 && (
                    <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-700">
                        <ShieldCheck className="h-12 w-12 text-zinc-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Documentation Center</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                            We are currently digitizing our latest ISO, FCO, and Lab documents.
                            The full repository will be available here shortly.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
