'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown } from 'lucide-react';

type Branch = {
  _id: string;
  name: string;
};

type Program = {
  value: string;
  label: string;
};

const OTHERS = '__OTHERS__';

const currentYear = new Date().getFullYear();

// One year "behind" (already graduated / graduating this cycle) through six
// years ahead — comfortably covers every semester of a 4-6 year program.
const graduationYears = Array.from({ length: 8 }, (_, index) => currentYear - 1 + index);

// Not an exhaustive/official VTU list — common VTU-affiliated colleges plus
// an "Others" escape hatch for anything not listed (or not under VTU).
const vtuColleges = [
  'RV College of Engineering, Bengaluru',
  'BMS College of Engineering, Bengaluru',
  'Bangalore Institute of Technology, Bengaluru',
  'Dayananda Sagar College of Engineering, Bengaluru',
  'Sir M. Visvesvaraya Institute of Technology, Bengaluru',
  'RNS Institute of Technology, Bengaluru',
  'BMS Institute of Technology and Management, Bengaluru',
  'New Horizon College of Engineering, Bengaluru',
  'Global Academy of Technology, Bengaluru',
  'Nitte Meenakshi Institute of Technology, Bengaluru',
  'Sapthagiri College of Engineering, Bengaluru',
  'East West Institute of Technology, Bengaluru',
  'HKBK College of Engineering, Bengaluru',
  'K S Institute of Technology, Bengaluru',
  'AMC Engineering College, Bengaluru',
  'City Engineering College, Bengaluru',
  'Rajarajeswari College of Engineering, Bengaluru',
  'Vivekananda Institute of Technology, Bengaluru',
  'CMR Institute of Technology, Bengaluru',
  'Acharya Institute of Technology, Bengaluru',
  'Jain Institute of Technology, Davangere',
  'SDM College of Engineering and Technology, Dharwad',
  'PDA College of Engineering, Kalaburagi',
  'Basaveshwar Engineering College, Bagalkot',
  'Malnad College of Engineering, Hassan',
  'Sri Jayachamarajendra College of Engineering, Mysuru',
  'The National Institute of Engineering, Mysuru',
  'Vidyavardhaka College of Engineering, Mysuru',
  'PES College of Engineering, Mandya',
  'Government Engineering College, Hassan',
  'Government Engineering College, Ramanagara',
];

// Standard VTU engineering branches, plus "Others" for anything not listed.
const vtuBranches = [
  'Computer Science and Engineering (CSE)',
  'Information Science and Engineering (ISE)',
  'Electronics and Communication Engineering (ECE)',
  'Electrical and Electronics Engineering (EEE)',
  'Mechanical Engineering (ME)',
  'Civil Engineering (CE)',
  'Artificial Intelligence and Machine Learning (AI & ML)',
  'Artificial Intelligence and Data Science (AI & DS)',
  'Computer Science and Business Systems (CSBS)',
  'Electronics and Instrumentation Engineering (EIE)',
  'Electronics and Telecommunication Engineering (ETE)',
  'Industrial Engineering and Management (IEM)',
  'Aeronautical Engineering',
  'Automobile Engineering',
  'Biotechnology',
  'Chemical Engineering',
  'Bio-Medical Engineering',
  'Mining Engineering',
  'Polymer Science and Technology',
  'Textile Technology',
];

const programs: Program[] = [
  {
    value: 'tech-foundations',
    label: 'Tech Foundations',
  },
  {
    value: 'full-stack-development',
    label: 'Full Stack Development',
  },
  {
    value: 'ai-ml',
    label: 'AI + Machine Learning',
  },
];

const semesters = [
  { value: '1', label: '1st Semester' },
  { value: '2', label: '2nd Semester' },
  { value: '3', label: '3rd Semester' },
  { value: '4', label: '4th Semester' },
  { value: '5', label: '5th Semester' },
  { value: '6', label: '6th Semester' },
  { value: '7', label: '7th Semester' },
  { value: '8', label: '8th Semester' },
];

const tracksByProgram: Record<string, Program[]> = {
  'tech-foundations': [
    {
      value: 'core-programming',
      label: 'Core Programming & CS Fundamentals',
    },
    {
      value: 'dsa',
      label: 'DSA & Problem Solving',
    },
  ],

  'full-stack-development': [
    {
      value: 'mern',
      label: 'MERN Stack',
    },
    {
      value: 'java-full-stack',
      label: 'Java Full Stack',
    },
  ],

  'ai-ml': [
    {
      value: 'machine-learning',
      label: 'Machine Learning',
    },
    {
      value: 'ai-engineering',
      label: 'AI Engineering',
    },
    {
      value: 'ai-ml-advanced',
      label: 'AI + ML Advanced',
    },
  ],
};

// `collegeName`, `branchName` and `graduationYear` each have their own
// dedicated block below (dropdown, some with an "Others" fallback), so
// they're no longer in this generic plain-text list.
const fields = [
  ['phone', 'Phone'],
  ['usn', 'USN'],
  ['githubUrl', 'GitHub'],
  ['linkedinUrl', 'LinkedIn'],
  ['portfolioUrl', 'Portfolio'],
];

const inputClass = `
  w-full rounded-xl border border-[#2B1B30] bg-[#191020] px-4 py-3
  text-[#F7F2F7] placeholder:text-[#6F6272] outline-none transition
  focus:border-[#7A2368] focus:ring-2 focus:ring-[#7A2368]/20
`;

const selectClass = `${inputClass} cursor-pointer appearance-none pr-10 disabled:cursor-not-allowed disabled:opacity-50`;

function Select({
  value,
  onChange,
  required,
  disabled,
  children,
}: {
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        required={required}
        disabled={disabled}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={selectClass}
      >
        {children}
      </select>

      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A99CAA]" />
    </div>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="md:col-span-2">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#C05AA8]">
        {title}
      </h3>

      {subtitle && (
        <p className="mt-1 text-xs text-[#6F6272]">{subtitle}</p>
      )}

      <div className="mt-4 h-px w-full bg-[#2B1B30]" />
    </div>
  );
}

export default function OnboardingForm({
  initialName,
}: {
  initialName: string;
}) {
  const router = useRouter();

  const [values, setValues] = useState<Record<string, string>>({
    fullName: initialName,
  });

  const [branches, setBranches] = useState<Branch[]>([]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [collegeIsOther, setCollegeIsOther] = useState(false);
  const [branchIsOther, setBranchIsOther] = useState(false);

  const selectedGradYear = values.graduationYear
    ? Number(values.graduationYear)
    : null;

  // Once a student has already graduated or is graduating this year, a
  // "current semester" no longer applies.
  const showSemester = !selectedGradYear || selectedGradYear > currentYear;

  useEffect(() => {
    async function loadBranches() {
      try {
        const response = await fetch('/api/branches');

        if (!response.ok) {
          throw new Error('Unable to load branches');
        }

        const data = await response.json();

        setBranches(data.result || []);
      } catch {
        // Non-fatal: the branch dropdown below is a static VTU list, this
        // fetch is only used to link a selection to an internal branch
        // record when one exists.
      }
    }

    loadBranches();
  }, []);

  useEffect(() => {
    if (!showSemester) {
      setValues((current) => {
        if (!current.semester) return current;
        const next = { ...current };
        delete next.semester;
        return next;
      });
    }
  }, [showSemester]);

  const update = (key: string, value: string) => {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));

    // Reset track when program changes
    if (key === 'preferredProgram') {
      setValues((current) => ({
        ...current,
        preferredProgram: value,
        preferredTrack: '',
      }));
    }
  };

  const handleCollegeSelect = (value: string) => {
    if (value === OTHERS) {
      setCollegeIsOther(true);
      update('collegeName', '');
    } else {
      setCollegeIsOther(false);
      update('collegeName', value);
    }
  };

  const handleBranchSelect = (value: string) => {
    if (value === OTHERS) {
      setBranchIsOther(true);
      update('branchName', '');
      update('branchId', '');
    } else {
      setBranchIsOther(false);
      update('branchName', value);

      const matched = branches.find(
        (branch) =>
          branch.name.trim().toLowerCase() === value.trim().toLowerCase()
      );

      update('branchId', matched ? matched._id : '');
    }
  };

  const availableTracks =
    tracksByProgram[values.preferredProgram] || [];

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setError('');

    if (!values.collegeName?.trim()) {
      setError('Please select or enter your college.');
      setSaving(false);
      return;
    }

    if (!values.branchName?.trim()) {
      setError('Please select or enter your engineering branch.');
      setSaving(false);
      return;
    }

    if (!values.graduationYear) {
      setError('Please select your graduation year.');
      setSaving(false);
      return;
    }

    if (showSemester && !values.semester) {
      setError('Please select your current semester.');
      setSaving(false);
      return;
    }

    if (!values.preferredProgram) {
      setError('Please select your preferred internship program.');
      setSaving(false);
      return;
    }

    if (!values.preferredTrack) {
      setError('Please select your preferred track.');
      setSaving(false);
      return;
    }

    const { branchId, ...formValues } = values;
    const payload = {
      ...formValues,
      ...(branchId ? { branchId } : {}),

      semester: showSemester && values.semester
        ? Number(values.semester)
        : undefined,

      graduationYear: Number(values.graduationYear),

      skills: values.skills
        ?.split(',')
        .map((skill) => skill.trim())
        .filter(Boolean),

      onboardingCompleted: true,
    };

    try {
      const response = await fetch('/api/students/me', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Unable to save profile');
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError(
        'Unable to save your profile. Please try again.'
      );
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="
        mt-10 grid grid-cols-1 gap-x-6 gap-y-6
        rounded-2xl
        border border-[#2B1B30]
        bg-[#120D18]
        p-6 sm:p-8
        shadow-2xl shadow-black/20
        md:grid-cols-2
      "
    >
      <div className="md:col-span-2">
        <p className="text-xs text-[#6F6272]">
          Fields marked <span className="text-[#A33B87]">*</span> are required.
        </p>
      </div>

      <SectionHeading title="Personal Details" />

      {fields.slice(0, 2).map(([key, label]) => (
        <label key={key} className="grid gap-2 text-sm text-[#A99CAA]">
          <span>
            {label}
            <span className="ml-1 text-[#A33B87]">*</span>
          </span>

          <input
            required
            value={values[key] || ''}
            onChange={(event) => update(key, event.target.value)}
            type="text"
            placeholder={key === 'usn' ? 'Enter your USN' : undefined}
            className={inputClass}
          />
        </label>
      ))}

      <SectionHeading title="Academic Details" />

      {/* College */}
      <label className="grid gap-2 text-sm text-[#A99CAA]">
        <span>
          College
          <span className="ml-1 text-[#A33B87]">*</span>
        </span>

        <Select
          required
          value={collegeIsOther ? OTHERS : values.collegeName || ''}
          onChange={handleCollegeSelect}
        >
          <option value="">Select your college</option>

          {vtuColleges.map((college) => (
            <option key={college} value={college}>
              {college}
            </option>
          ))}

          <option value={OTHERS}>Others (not listed / not under VTU)</option>
        </Select>

        {collegeIsOther && (
          <input
            required
            value={values.collegeName || ''}
            onChange={(event) => update('collegeName', event.target.value)}
            placeholder="Enter your college name"
            className={inputClass}
          />
        )}
      </label>

      {/* Engineering Branch */}
      <label className="grid gap-2 text-sm text-[#A99CAA]">
        <span>
          Engineering Branch
          <span className="ml-1 text-[#A33B87]">*</span>
        </span>

        <Select
          required
          value={branchIsOther ? OTHERS : values.branchName || ''}
          onChange={handleBranchSelect}
        >
          <option value="">Select your branch</option>

          {vtuBranches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}

          <option value={OTHERS}>Others (not listed)</option>
        </Select>

        {branchIsOther && (
          <input
            required
            value={values.branchName || ''}
            onChange={(event) => update('branchName', event.target.value)}
            placeholder="Enter your branch name"
            className={inputClass}
          />
        )}

        <span className="text-xs text-[#6F6272]">
          Select the engineering branch mentioned in your college records.
        </span>
      </label>

      {/* Graduation Year */}
      <label className="grid gap-2 text-sm text-[#A99CAA]">
        <span>
          Graduation Year
          <span className="ml-1 text-[#A33B87]">*</span>
        </span>

        <Select
          required
          value={values.graduationYear || ''}
          onChange={(value) => update('graduationYear', value)}
        >
          <option value="">Select graduation year</option>

          {graduationYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </label>

      {/* Semester — hidden once the student has already graduated / is graduating this year */}
      {showSemester ? (
        <label className="grid gap-2 text-sm text-[#A99CAA]">
          <span>
            Current Semester
            <span className="ml-1 text-[#A33B87]">*</span>
          </span>

          <Select
            required
            value={values.semester || ''}
            onChange={(value) => update('semester', value)}
          >
            <option value="">Select semester</option>

            {semesters.map((semester) => (
              <option key={semester.value} value={semester.value}>
                {semester.label}
              </option>
            ))}
          </Select>
        </label>
      ) : (
        <div className="hidden md:block" aria-hidden="true" />
      )}

      <SectionHeading title="Program Preferences" />

      {/* Internship Program */}
      <label className="grid gap-2 text-sm text-[#A99CAA]">
        <span>
          Preferred Internship Program
          <span className="ml-1 text-[#A33B87]">*</span>
        </span>

        <Select
          required
          value={values.preferredProgram || ''}
          onChange={(value) => update('preferredProgram', value)}
        >
          <option value="">Select internship program</option>

          {programs.map((program) => (
            <option key={program.value} value={program.value}>
              {program.label}
            </option>
          ))}
        </Select>
      </label>

      {/* Track */}
      <label className="grid gap-2 text-sm text-[#A99CAA]">
        <span>
          Preferred Track
          <span className="ml-1 text-[#A33B87]">*</span>
        </span>

        <Select
          required
          disabled={!values.preferredProgram}
          value={values.preferredTrack || ''}
          onChange={(value) => update('preferredTrack', value)}
        >
          <option value="">
            {!values.preferredProgram ? 'Select a program first' : 'Select track'}
          </option>

          {availableTracks.map((track) => (
            <option key={track.value} value={track.value}>
              {track.label}
            </option>
          ))}
        </Select>
      </label>

      <SectionHeading title="Links & Skills" subtitle="Optional, but recommended." />

      {fields.slice(2).map(([key, label]) => (
        <label key={key} className="grid gap-2 text-sm text-[#A99CAA]">
          <span>{label}</span>

          <input
            value={values[key] || ''}
            onChange={(event) => update(key, event.target.value)}
            type="text"
            className={inputClass}
          />
        </label>
      ))}

      <label className="grid gap-2 text-sm text-[#A99CAA] md:col-span-2">
        <span>Technical Skills</span>

        <input
          value={values.skills || ''}
          onChange={(event) => update('skills', event.target.value)}
          placeholder="JavaScript, Java, Python, React..."
          className={inputClass}
        />

        <span className="text-xs text-[#6F6272]">
          Separate multiple skills with commas.
        </span>
      </label>

      {/* Error */}
      {error && (
        <div
          className="
            rounded-xl
            border border-red-900/50
            bg-red-950/30
            px-4 py-3
            text-sm
            text-red-300
            md:col-span-2
          "
        >
          {error}
        </div>
      )}

      {/* Actions */}
      <div className="mt-2 border-t border-[#2B1B30] pt-6 md:col-span-2">
        <button
          type="submit"
          disabled={saving}
          className="
            w-full rounded-xl bg-[#7A2368] px-5 py-3 font-medium text-[#F7F2F7]
            transition hover:bg-[#A33B87] hover:shadow-lg hover:shadow-[#7A2368]/20
            disabled:cursor-not-allowed disabled:opacity-50
            md:w-auto
          "
        >
          {saving ? 'Saving your profile...' : 'Complete profile'}
        </button>
      </div>
    </form>
  );
}