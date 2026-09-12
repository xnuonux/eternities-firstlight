"""Known-answer local refusal and idempotency cases; no GitHub requests."""
from pathlib import Path
import importlib.util,hashlib,json,subprocess,tempfile,unittest
spec=importlib.util.spec_from_file_location('imp',Path(__file__).resolve().parents[1]/'tools/import_into_checkout.py');imp=importlib.util.module_from_spec(spec);spec.loader.exec_module(imp)
class ImportRules(unittest.TestCase):
 def setUp(self):
  self.tmp=tempfile.TemporaryDirectory();self.root=Path(self.tmp.name);self.src=self.root/'source';self.dst=self.root/'checkout';self.src.mkdir();self.dst.mkdir()
  self.git('init','-b','review');self.git('config','user.name','Fixture');self.git('config','user.email','fixture@example.invalid');self.git('remote','add','origin','https://github.com/xnuonux/eternities-firstlight.git');self.git('commit','--allow-empty','-m','fixture');(self.src/'hello.txt').write_bytes(b'hello\n');self.manifest()
 def tearDown(self):self.tmp.cleanup()
 def git(self,*a):return subprocess.run(['git','-C',str(self.dst),*a],check=True,capture_output=True,text=True)
 def manifest(self,path='hello.txt'):
  d=b'hello\n';(self.src/'SOURCE_MANIFEST.json').write_text(json.dumps({'files':[{'path':path,'bytes':len(d),'sha256':hashlib.sha256(d).hexdigest()}]}))
 def test_dry_run_only(self):
  p=imp.plan(self.dst,self.src);self.assertEqual(len(p),1);self.assertFalse((self.dst/'hello.txt').exists())
 def test_main_refused(self):
  self.git('branch','-m','main');self.assertRaises(ValueError,imp.plan,self.dst,self.src)
 def test_wrong_remote_refused(self):
  self.git('remote','set-url','origin','https://github.com/elsewhere/other.git');self.assertRaises(ValueError,imp.plan,self.dst,self.src)
 def test_dirty_refused(self):
  (self.dst/'unrelated.txt').write_text('unsaved');self.assertRaises(ValueError,imp.plan,self.dst,self.src)
 def test_conflict_refused(self):
  (self.dst/'hello.txt').write_text('different');self.git('add','.');self.git('commit','-m','other work');self.assertRaises(ValueError,imp.plan,self.dst,self.src)
 def test_identical_preserved(self):
  (self.dst/'hello.txt').write_bytes(b'hello\n');self.git('add','.');self.git('commit','-m','same');self.assertEqual(imp.plan(self.dst,self.src),[])
 def test_source_corruption_refused(self):
  (self.src/'hello.txt').write_text('broken');self.assertRaises(ValueError,imp.plan,self.dst,self.src)
 def test_unsafe_path_refused(self):
  for x in ['../secret','/absolute','a\\b','.git/config','a/../b','c:foo']:
   with self.subTest(x=x):self.assertRaises(ValueError,imp.relative,x)
 def test_case_duplicate_refused(self):
  p=self.src/'SOURCE_MANIFEST.json';d=json.loads(p.read_text());d['files']*=2;p.write_text(json.dumps(d));self.assertRaises(ValueError,imp.plan,self.dst,self.src)
 def test_symlink_refused(self):
  try:(self.dst/'hello.txt').symlink_to(self.src/'hello.txt')
  except OSError as exc:
   if getattr(exc,'winerror',None)==1314:self.skipTest('Windows account lacks symlink privilege; real symlink refusal is exercised on Linux CI')
   raise
  self.git('add','.');self.git('commit','-m','symlink');self.assertRaises(ValueError,imp.plan,self.dst,self.src)
if __name__=='__main__':unittest.main(verbosity=2)
