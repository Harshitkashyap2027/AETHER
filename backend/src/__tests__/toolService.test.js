'use strict';

const { parseIntent, runSafeCommand } = require('../services/toolService');

describe('toolService.parseIntent', () => {
  it('returns null for unrecognized messages', () => {
    expect(parseIntent('What is the weather today?')).toBeNull();
    expect(parseIntent('Tell me a joke')).toBeNull();
  });

  it('detects "list files" intent', () => {
    expect(parseIntent('list files')).toEqual({ action: 'list_files', args: [] });
    expect(parseIntent('show files')).toEqual({ action: 'list_files', args: [] });
    expect(parseIntent('ls')).toEqual({ action: 'list_files', args: [] });
  });

  it('detects "pwd" intent', () => {
    expect(parseIntent('current directory')).toEqual({ action: 'pwd', args: [] });
    expect(parseIntent('where am I')).toEqual({ action: 'pwd', args: [] });
    expect(parseIntent('pwd')).toEqual({ action: 'pwd', args: [] });
  });

  it('detects "disk usage" intent', () => {
    expect(parseIntent('disk usage')).toEqual({ action: 'disk_usage', args: [] });
    expect(parseIntent('disk space')).toEqual({ action: 'disk_usage', args: [] });
  });

  it('detects "uptime" intent', () => {
    expect(parseIntent('system uptime')).toEqual({ action: 'uptime', args: [] });
    expect(parseIntent('uptime')).toEqual({ action: 'uptime', args: [] });
  });

  it('detects "datetime" intent', () => {
    expect(parseIntent('current time')).toEqual({ action: 'datetime', args: [] });
    expect(parseIntent('date and time')).toEqual({ action: 'datetime', args: [] });
  });

  it('detects "echo" intent with argument', () => {
    expect(parseIntent('echo Hello World')).toEqual({ action: 'echo', args: ['Hello World'] });
  });
});

describe('toolService.runSafeCommand', () => {
  it('throws for unknown/unsafe actions', async () => {
    await expect(runSafeCommand('rm_rf')).rejects.toThrow(/unsafe or unknown/i);
  });

  it('executes pwd command', async () => {
    const result = await runSafeCommand('pwd');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('executes date command', async () => {
    const result = await runSafeCommand('datetime');
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });

  it('executes echo command safely', async () => {
    const result = await runSafeCommand('echo', ['Hello AETHER']);
    expect(result).toBe('Hello AETHER');
  });

  it('strips non-printable characters from echo input', async () => {
    const result = await runSafeCommand('echo', ['Hello\x00World']);
    expect(result).toBe('HelloWorld');
  });
});
